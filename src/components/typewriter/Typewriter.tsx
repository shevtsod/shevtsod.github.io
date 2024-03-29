import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Caret from '../caret/Caret';

export interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  duration: number;
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
    let interval = setInterval(() => {
      if (!paused && counter < children.length) {
        setCounter(counter + 1);
      }
    }, duration / children.length);

    return () => clearInterval(interval);
  }, [paused, duration, children, counter]);

  return (
    <span {...props} className={classNames('whitespace-pre-wrap', className)}>
      {children.slice(0, counter)}
      <Caret />
    </span>
  );
}
