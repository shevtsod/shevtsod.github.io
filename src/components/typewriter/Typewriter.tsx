import { useEffect, useMemo, useState } from 'react';
import { Caret } from '../caret/Caret';

export interface TypewriterProps {
  className?: string;
  text: string;
  duration: number;
  delay?: number;
}

export default function Typewriter({
  className = '',
  text = '',
  duration = 1,
  delay = 0,
}: TypewriterProps) {
  const [started, setStarted] = useState(false);
  const [displayChars, setDisplayChars] = useState(0);

  // Start delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);

    return () => {
      setStarted(false);
      clearTimeout(timeout);
    };
  }, [delay, text]);

  // Typewriter effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (started) {
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
  }, [started, duration, text, displayChars]);

  // Reset when text changes
  useEffect(() => {
    setDisplayChars(0);
  }, [text]);

  const displayText = useMemo(
    () => text.slice(0, displayChars),
    [text, displayChars],
  );

  return (
    <span className={`whitespace-pre-wrap ${className}`}>
      {displayText}
      <Caret />
    </span>
  );
}
