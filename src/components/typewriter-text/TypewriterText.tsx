import { useEffect, useMemo, useState } from 'react';
import styles from './TypewriterText.module.css';

export interface TypewriterTextProps {
  className?: string;
  text: string;
  duration: number;
  delay?: number;
}

export default function TypewriterText({
  className,
  text,
  duration,
  delay,
}: TypewriterTextProps) {
  const [paused, setPaused] = useState(true);
  const [displayChars, setDisplayChars] = useState(0);

  // Start delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPaused(false);
    }, (delay ?? 0) * 1000);

    return () => clearTimeout(timeout);
  }, [delay]);

  // Typewriter effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (!paused) {
      interval = setInterval(() => {
        if (displayChars < text.length) {
          setDisplayChars(displayChars + 1);
        } else {
          clearInterval(interval);
        }
      }, (duration * 1000) / text.length);
    }

    return () => clearInterval(interval);
  }, [paused, duration, text, displayChars]);

  const displayText = useMemo(
    () => text.slice(0, displayChars),
    [displayChars]
  );

  return (
    <span
      className={`${styles.typewriterText} ${className ?? ''} border-r-[0.7em]`}
    >
      {displayText}
    </span>
  );
}
