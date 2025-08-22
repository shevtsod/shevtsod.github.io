import { useEffect, useState } from 'react';

/**
 * Generates and returns a random character
 *
 * @returns random character
 */
function getRandomChar() {
  // List containing only characters with the same glyph width (excludes " ", ".", ",", etc.)
  const chars =
    '!"#$%&()*+,-/:;<=>?@ABCDEFGHJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijkmnopqrstuvwxyz{|}~';
  return chars[Math.floor(Math.random() * chars.length)];
}

/**
 * Randomizes character in a string
 *
 * @param str source string
 * @param index index of character to scramble
 * @returns string with one character scrambled
 */
function scrambleOne(str: string, index: number) {
  return str.slice(0, index) + getRandomChar() + str.slice(index + 1);
}

/**
 * Randomizes all non-space characters in a string
 *
 * @param str source string
 * @returns string with all non-space characters scrambled
 */
function scramble(str: string) {
  return str
    .split('')
    .map((char) => (char === ' ' ? ' ' : getRandomChar()))
    .join('');
}

export interface ScrambledTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: string;
  frequency?: number;
  duration?: number;
  scrambling?: boolean;
}

/**
 * Renders the given string and randomly scrambles a character periodically for
 * a glitched effect. Scrambles all characters for a short time on hover.
 */
export default function ScrambledText({
  children = '',
  frequency = 1,
  duration = 300,
  scrambling = false,
  ...props
}: ScrambledTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isScramblingOne, setIsScramblingOne] = useState(false);
  const [isScrambling, setIsScrambling] = useState(scrambling);

  // Start scrambling on prop change
  useEffect(() => {
    if (scrambling) {
      setIsScrambling(true);
    }
  }, [scrambling]);

  // Start scrambling one character once in a while
  useEffect(() => {
    const interval = setInterval(
      () => {
        setIsScramblingOne(true);
      },
      2000 + Math.random() * 1000,
    );

    return () => {
      clearTimeout(interval);
    };
  }, [setIsScramblingOne]);

  // Scramble one character
  useEffect(() => {
    if (isScrambling) return;

    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    let index = -1;
    do {
      index = Math.floor(Math.random() * (children.length - 1));
    } while (index >= 0 && children[index] === ' ');

    if (isScramblingOne) {
      interval = setInterval(() => {
        setDisplayText(scrambleOne(children, index));
      }, frequency);

      timeout = setTimeout(() => {
        clearInterval(interval);
        setDisplayText(children);
        setIsScramblingOne(false);
      }, duration);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isScramblingOne, isScrambling, children, frequency, duration]);

  // Scramble all characters on hover
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    if (isScrambling) {
      interval = setInterval(() => {
        setDisplayText(scramble(children));
      }, frequency);

      timeout = setTimeout(() => {
        clearInterval(interval);
        setDisplayText(children);
        setIsScrambling(false);
      }, duration);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isScrambling, children, frequency, duration]);

  if (!children) return;

  return (
    <span onMouseEnter={() => setIsScrambling(true)} {...props}>
      {displayText}
    </span>
  );
}
