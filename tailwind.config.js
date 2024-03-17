import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-mode="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e51716',
        secondary: '#b8a401',
        tertiary: '#222741',
      },
      fontFamily: {
        cursive: ['Nothing You Could Do', 'cursive'],
        mono: ['"Syne Mono"', ...defaultTheme.fontFamily.mono],
        retro: ['"SH Pinscher"', ...defaultTheme.fontFamily.mono],
        sans: ['"Ysabeau Office Variable"', ...defaultTheme.fontFamily.sans],
        serif: ['"Labrada Variable"', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
