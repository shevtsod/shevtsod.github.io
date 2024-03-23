import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-mode="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          gray: {
            100: '#ffffff',
            200: '#bebebe',
            400: '#858585',
            600: '#161616',
            800: '#000000',
          },
          red: {
            200: '#ea552d',
            400: '#e51716',
            600: '#92080f',
            800: '#5e040e',
          },
          orange: {
            200: '#e4a20d',
            400: '#c97b07',
            600: '#ad5d01',
            800: '#883b01',
          },
          yellow: {
            200: '#fffe81',
            400: '#e8db6d',
            600: '#bfa850',
            800: '#a78a3f',
          },
          tan: {
            200: '#f6e4d4',
            400: '#d4bea5',
            600: '#a18a74',
            800: '#846c5f',
          },
          green: {
            200: '#c1e955',
            400: '#91cf30',
            600: '#61b327',
            800: '#44941a',
          },
          blue: {
            200: '#1e5898',
            400: '#1b3562',
            600: '#15233e',
            800: '#0c0f1d',
          },
        },
      },
      fontFamily: {
        cursive: ['Nothing You Could Do', 'cursive'],
        mono: ['"Syne Mono"', ...defaultTheme.fontFamily.mono],
        retro: ['"SH Pinscher"', ...defaultTheme.fontFamily.mono],
        sans: ['"Ysabeau Office Variable"', ...defaultTheme.fontFamily.sans],
        serif: ['"Labrada Variable"', ...defaultTheme.fontFamily.serif],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s steps(4, end) both',
      },
    },
  },
  plugins: [],
};
