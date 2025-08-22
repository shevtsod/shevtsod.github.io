import classNames from 'classnames';
import {
  Arimo,
  Labrada,
  Nothing_You_Could_Do,
  Syne_Mono,
} from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

// https://nextjs.org/docs/app/getting-started/fonts

// font-cursive
// https://fonts.google.com/specimen/Nothing+You+Could+Do
export const fontCursive = Nothing_You_Could_Do({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cursive',
});

// font-mono
// https://fonts.google.com/specimen/Syne+Mono
export const fontMono = Syne_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
});

// font-pixel
// https://www.fontsquirrel.com/fonts/Silkscreen
export const fontPixel = localFont({
  src: [
    {
      path: '../../public/fonts/Silkscreen/Silkscreen.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Silkscreen/Silkscreen-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
  ],
  variable: '--font-pixel',
});

// font-retro
// https://www.fontsquirrel.com/fonts/sh-pinscher
export const fontRetro = localFont({
  src: '../../public/fonts/SHPinscher/SHPinscher-Regular.woff2',
  variable: '--font-retro',
});

// font-sans
// https://fonts.google.com/specimen/Arimo
export const fontSans = Arimo({
  subsets: ['latin'],
  variable: '--font-sans',
});

// font-serif
// https://fonts.google.com/specimen/Labrada
export const fontSerif = Labrada({
  subsets: ['latin'],
  variable: '--font-serif',
});

// export so that the styles can be passed to both Next.js and to Storybook
export const rootClassName = classNames(
  fontCursive.variable,
  fontMono.variable,
  fontPixel.variable,
  fontRetro.variable,
  fontSans.variable,
  fontSerif.variable,
  'antialiased bg-white dark:bg-black',
);
