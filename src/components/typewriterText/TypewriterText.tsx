import { useEffect, useMemo, useState } from 'react';
import { Caret } from '../caret/Caret';

export interface TypewriterTextProps {
  className?: string;
  text: string;
  duration: number;
  delay?: number;
}

export default function TypewriterText({
  className = '',
  text = '',
  duration = 1,
  delay = 0,
}: TypewriterTextProps) {
  const [paused, setPaused] = useState(true);
  const [displayChars, setDisplayChars] = useState(0);

  // Start delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPaused(false);
    }, delay * 1000);

    return () => {
      setPaused(true);
      clearTimeout(timeout);
    };
  }, [delay, text]);

  // Typewriter effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (!paused) {
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
  }, [paused, duration, text, displayChars]);

  // Reset when text changes
  useEffect(() => {
    setDisplayChars(0);
  }, [text]);

  const displayText = useMemo(
    () => text.slice(0, displayChars),
    [text, displayChars],
  );

  return (
    <span className={`${className} whitespace-pre-wrap`}>
      {displayText}
      <Caret />
    </span>
  );
}
