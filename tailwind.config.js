// tailwind.config.js

/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['border-primary-500', 'bg-primary-500', 'text-primary-500'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#e0fffb',
          100: '#b3fff3',
          200: '#80ffeb',
          300: '#4dffe2',
          400: '#1affda',
          500: '#00ffe0',
          600: '#00c2a8',
          700: '#00877c',
          800: '#005f56',
          900: '#003933',
        },
        gray: colors.gray,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
