'use client';

import Icon from '@/components/icon';
import classNames from 'classnames';
import { HTMLAttributes, useEffect, useState } from 'react';

export interface ThemeSwitchProps extends HTMLAttributes<HTMLButtonElement> {}

/**
 * Renders a button that changes the current theme when clicked.
 */
export default function ThemeSwitch({ className, ...props }: ThemeSwitchProps) {
  const [theme, setTheme] = useState<string | undefined>(undefined);

  // Detect current theme
  // https://tailwindcss.com/docs/dark-mode#with-system-theme-support
  useEffect(() => {
    // Change mode on mount from localStorage or user preference
    const localStorageTheme = localStorage.getItem('theme');
    const prefersTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    const computedTheme = theme ?? localStorageTheme ?? prefersTheme;
    setTheme(computedTheme);
    document.documentElement.classList.toggle('dark', computedTheme === 'dark');
    localStorage.setItem('theme', computedTheme);

    // Watch for preference change
    function toggleTheme(event: MediaQueryListEvent) {
      setTheme(event.matches ? 'dark' : 'light');
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', toggleTheme);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', toggleTheme);
    };
  }, [theme]);

  return (
    <button
      onClick={() =>
        setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
      }
      {...props}
      className={classNames(
        'relative h-full aspect-square cursor-pointer text-theme-red-400',
        className,
      )}
      aria-label="Theme"
    >
      {['16x/sun', '16x/moon'].map((icon, i) => (
        <Icon
          key={i}
          className={classNames(
            'h-full w-auto transition-opacity ease-[steps(3,end)] duration-400',
            {
              'absolute top-0 left-0`': i === 1,
              'opacity-0': i === 0 ? theme === 'dark' : theme === 'light',
            },
          )}
          viewBox="0 0 16 16"
          icon={icon}
        />
      ))}
    </button>
  );
}
