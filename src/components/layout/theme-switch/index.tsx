'use client';

import Icon, { IconKey } from '@/components/icon';
import { useTheme } from '@/components/theme';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';

export interface ThemeSwitchProps extends HTMLAttributes<HTMLButtonElement> {}

/**
 * Renders a button that changes the current theme when clicked.
 */
export default function ThemeSwitch({ className, ...props }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() =>
        setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
      }
      {...props}
      className={classNames(
        'relative h-full w-auto cursor-pointer text-theme-red-400',
        className,
      )}
      aria-label="Theme"
    >
      {(['Sun', 'Moon'] as IconKey[]).map((icon, i) => (
        <Icon
          key={i}
          className={classNames(
            'h-full w-auto transition-all ease-[steps(3,end)] duration-200',
            {
              'absolute top-0 left-0`': i === 1,
              'scale-0': i === 0 ? theme !== 'light' : theme !== 'dark',
              'delay-50': i === 1 ? theme !== 'light' : theme !== 'dark',
            },
          )}
          icon={icon}
        />
      ))}
    </button>
  );
}
