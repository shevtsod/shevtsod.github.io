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
  children: string;
  frequency?: number;
  duration?: number;
}

export default function ScrambledText({
  children,
  frequency = 1,
  duration = 300,
  ...props
}: ScrambledTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const [scramblingOne, setScramblingOne] = useState(false);
  const [scrambling, setScrambling] = useState(false);

  // Start scrambling one character once in a while
  useEffect(() => {
    const interval = setInterval(() => {
      setScramblingOne(true);
    }, 2000 + Math.random() * 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [setScramblingOne]);

  // Scramble one character
  useEffect(() => {
    if (scrambling) return;

    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    let index = -1;
    do {
      index = Math.floor(Math.random() * (children.length - 1));
    } while (index >= 0 && children[index] === ' ');

    if (scramblingOne) {
      interval = setInterval(() => {
        setDisplayText(scrambleOne(children, index));
      }, frequency);

      timeout = setTimeout(() => {
        clearInterval(interval);
        setDisplayText(children);
        setScramblingOne(false);
      }, duration);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [scramblingOne, scrambling, children, frequency, duration]);

  // Scramble all characters on hover
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    if (scrambling) {
      interval = setInterval(() => {
        setDisplayText(scramble(children));
      }, frequency);

      timeout = setTimeout(() => {
        clearInterval(interval);
        setDisplayText(children);
        setScrambling(false);
      }, duration);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [scrambling, children, frequency, duration]);

  return (
    <span onMouseEnter={() => setScrambling(true)} {...props}>
      {displayText}
    </span>
  );
}
