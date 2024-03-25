import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import Caret from '../caret/Caret';

export interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  duration: number;
  paused?: boolean;
}

export default function Typewriter({
  text = '',
  duration = 1,
  paused,
  className,
  ...props
}: TypewriterProps) {
  const [playing, setPlaying] = useState(!paused);
  const [displayChars, setDisplayChars] = useState(0);

  // Start/pause
  useEffect(() => {
    setPlaying(!paused);
  }, [paused]);

  // Typewriter effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (playing) {
      interval = setInterval(
        () => {
          if (displayChars < text.length) {
            setDisplayChars(displayChars + 1);
          } else {
            clearInterval(interval);
          }
        },
        (duration * 1000) / text.length,
      );
    }

    return () => clearInterval(interval);
  }, [playing, duration, text, displayChars]);

  // Reset when text changes
  useEffect(() => {
    setDisplayChars(0);
  }, [text]);

  const displayText = useMemo(
    () => text.slice(0, displayChars),
    [text, displayChars],
  );

  return (
    <span {...props} className={classNames('whitespace-pre-wrap', className)}>
      {displayText}
      <Caret />
    </span>
  );
}
