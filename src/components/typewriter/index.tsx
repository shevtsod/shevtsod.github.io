import Caret from '@/components/caret';
import classNames from 'classnames';
import { ComponentProps, useEffect, useState } from 'react';

export interface TypewriterProps extends ComponentProps<'span'> {
  children: string;
  /** Interval, in milliseconds, between each character being typed. Takes precedence over "duration" */
  interval?: number;
  /** Total duration, in milliseconds, of the animation */
  duration?: number;
  /** Whether to play or pause the animation, paused by default */
  play?: boolean;
  /** Delay after play becomes true to start the animation */
  delay?: number;
  onComplete?: () => void;
}

/**
 * Renders the given string one character at a time as though it is being typed.
 */
export default function Typewriter({
  children,
  interval = 0,
  duration = 0,
  play = false,
  delay = 0,
  onComplete,
  className,
  ...props
}: TypewriterProps) {
  const [counter, setCounter] = useState(0);
  const completed = counter === children.length;

  // Reset counter when children change
  useEffect(() => {
    setCounter(0);
  }, [children]);

  // Increments the character counter on an interval
  useEffect(() => {
    if (!children.length || !play) return;

    if (!interval && !duration) {
      setCounter(children.length);
      return;
    }

    let counterInterval: NodeJS.Timeout | undefined;

    const delayTimeout = setTimeout(() => {
      counterInterval = setInterval(
        () => {
          setCounter((value) => Math.min(value + 1, children.length));
        },
        interval || duration / children.length,
      );
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(counterInterval);
    };
  }, [play, interval, duration, children, delay]);

  // Fire events
  useEffect(() => {
    if (completed) onComplete?.();
  }, [completed, onComplete]);

  return (
    <span className="relative inline-block">
      {/* Placeholder to take up final space of children */}
      {!completed && (
        <span
          {...props}
          className={classNames(
            'inline-block w-full leading-6 invisible',
            className,
          )}
        >
          {children}
          <Caret />
        </span>
      )}

      <span
        {...props}
        className={classNames(
          'inline-block top-0 left-0 w-full leading-6',
          { absolute: !completed },
          className,
        )}
        aria-live="polite"
      >
        {children.slice(0, counter)}
        <Caret />
      </span>
    </span>
  );
}
