import Caret from '@/components/Caret/Caret';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  duration?: number;
  paused?: boolean;
}

export default function Typewriter({
  children,
  duration = 1000,
  paused,
  className,
  ...props
}: TypewriterProps) {
  const [counter, setCounter] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setCounter((value) => Math.min(value + 1, children.length));
      }
    }, duration / children.length);

    return () => clearInterval(interval);
  }, [paused, duration, children]);

  return (
    <span {...props} className={classNames('whitespace-pre-wrap', className)}>
      {children.slice(0, counter)}
      <Caret />
    </span>
  );
}
