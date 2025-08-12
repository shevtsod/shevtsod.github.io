'use client';

import classNames from 'classnames';
import {
  Labrada,
  Nothing_You_Could_Do,
  Syne_Mono,
  Ysabeau_Office,
} from 'next/font/google';
import localFont from 'next/font/local';
import './global.css';

// https://nextjs.org/docs/app/getting-started/fonts

// font-cursive
// https://fonts.google.com/specimen/Nothing+You+Could+Do
export const nothingYouCouldDo = Nothing_You_Could_Do({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cursive',
});

// font-mono
// https://fonts.google.com/specimen/Syne+Mono
export const syneMono = Syne_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
});

// font-pixel
// https://www.fontsquirrel.com/fonts/Silkscreen
export const silkscreen = localFont({
  src: [
    {
      path: '../../../../public/fonts/Silkscreen/Silkscreen.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Silkscreen/Silkscreen-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
  ],
  variable: '--font-pixel',
});

// font-retro
// https://www.fontsquirrel.com/fonts/sh-pinscher
export const shPinscher = localFont({
  src: '../../../../public/fonts/SHPinscher/SHPinscher-Regular.woff2',
  variable: '--font-retro',
});

// font-sans
// https://fonts.google.com/specimen/Ysabeau+Office
export const ysabeauOffice = Ysabeau_Office({
  subsets: ['latin'],
  variable: '--font-sans',
});

// font-serif
// https://fonts.google.com/specimen/Labrada
export const labrada = Labrada({
  subsets: ['latin'],
  variable: '--font-serif',
});

export interface GlobalProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * Global styles component extracted from global layout.tsx so that the styles
 * can be passed to both Next.js and to Storybook (Storybook cannot take the
 * layout.tsx directly because it includes html and body elements).
 */
export default function Global({ children, className, ...props }: GlobalProps) {
  return (
    <div
      {...props}
      className={classNames(
        nothingYouCouldDo.variable,
        syneMono.variable,
        silkscreen.variable,
        shPinscher.variable,
        ysabeauOffice.variable,
        labrada.variable,
        'antialiased  dark:bg-theme-gray-800 text-theme-gray-800 dark:text-theme-gray-100 font-mono',
        className,
      )}
    >
      {children}
    </div>
  );
}
