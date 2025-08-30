import Caret from '@/components/caret';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  duration?: number;
  paused?: boolean;
}

/**
 * Renders the given string one character at a time as though it is being typed.
 */
export default function Typewriter({
  children,
  duration = 1000,
  paused,
  className,
  ...props
}: TypewriterProps) {
  const [counter, setCounter] = useState(0);

  // Reset counter when children change
  useEffect(() => {
    setCounter(0);
  }, [children]);

  // Increments the character counter on an interval
  useEffect(() => {
    if (!children.length || paused) return;
    if (duration === 0) {
      setCounter(children.length);
      return;
    }

    const interval = setInterval(() => {
      setCounter((value) => Math.min(value + 1, children.length));
    }, duration / children.length);

    return () => clearInterval(interval);
  }, [paused, duration, children]);

  return (
    <span
      {...props}
      className={classNames('whitespace-pre-wrap', className)}
      aria-live="polite"
    >
      {children.slice(0, counter)}
      <Caret />
    </span>
  );
}
