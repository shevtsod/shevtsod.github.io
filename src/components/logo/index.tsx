import classNames from 'classnames';
import { ComponentProps, useEffect, useState } from 'react';

// Total number of frames in the sprite sheet
const ANIMATION_FRAME_COUNT = 26;
// Start and end frames of each animation in the sprite sheet
const ANIMATION_FRAMES = {
  in: [0, 10],
  static: [11, 11],
  rotate: [12, 26],
};
// Duration of a frame in the animation in milliseconds
const ANIMATION_SPEED = 125;
// Interval of rotation animation in milliseconds
const ANIMATION_ROTATE_INTERVAL = 10000;

export interface LogoProps extends ComponentProps<'img'> {
  intro?: boolean;
  scale?: number;
  shown?: boolean;
  animated?: boolean;
}

/**
 * Renders a logo that can optionally be animated.
 */
export default function Logo({
  intro = false,
  shown = true,
  animated,
  className,
  ...props
}: LogoProps) {
  const [animation, setAnimation] = useState<keyof typeof ANIMATION_FRAMES>(
    intro ? 'in' : 'static',
  );
  const [frame, setFrame] = useState(ANIMATION_FRAMES.static[0]);

  // Change animation
  useEffect(() => {
    const [, lastFrame] = ANIMATION_FRAMES[animation];
    let timeout: NodeJS.Timeout | undefined;

    if (!animated) {
      // not animated - stay in static animation
      setAnimation('static');
    } else if (!shown) {
      // not shown - restart animation
      setAnimation('in');
    } else if (animation === 'static') {
      // static - switch to rotate animation after a delay
      timeout = setTimeout(() => {
        setAnimation('rotate');
      }, ANIMATION_ROTATE_INTERVAL);
    } else if (frame === lastFrame) {
      // finished current animation - return to static animation
      setAnimation('static');
    }

    return () => clearTimeout(timeout);
  }, [frame, animation, animated, shown]);

  // Play animations
  useEffect(() => {
    const [firstFrame, lastFrame] = ANIMATION_FRAMES[animation];

    // Play animation frames
    const interval = setInterval(() => {
      setFrame((value) => {
        if (value < firstFrame || value > lastFrame || !shown) {
          // Restart at the first frame
          return firstFrame;
        } else if (!animated || value === lastFrame) {
          // Keep the same frame
          return value;
        } else {
          // Play the next frame
          return value + 1;
        }
      });
    }, ANIMATION_SPEED);

    return () => clearInterval(interval);
  }, [frame, animation, animated, shown]);

  return (
    <div
      {...props}
      className={classNames(
        'bg-[url("/images/ui/logo.png")] image-pixelated h-full aspect-square bg-cover',
        className,
      )}
      style={{
        backgroundPositionX: `${(100 * frame) / ANIMATION_FRAME_COUNT}%`,
      }}
    />
  );
}
