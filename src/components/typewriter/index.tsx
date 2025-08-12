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

  // Increments the count of characters to be displayed on an interval
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (duration === 0) {
      setCounter(children.length);
    } else {
      interval = setInterval(() => {
        if (!paused) {
          setCounter((value) => Math.min(value + 1, children.length));
        }
      }, duration / children.length);
    }

    return () => clearInterval(interval);
  }, [paused, duration, children]);

  return (
    <span {...props} className={classNames('whitespace-pre-wrap', className)}>
      {children.slice(0, counter)}
      <Caret />
    </span>
  );
}
