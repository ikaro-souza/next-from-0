/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        outline: {
          DEFAULT: '#e0e0e0',
          dark: '#3c3c3c',
        },
        neutral: '#9E9E9E',
        'neutral-50': '#fafafa',
        'neutral-300': '#e0e0e0',
        'neutral-600': '#616161',
        'neutral-800': '#424242',
        'neutral-900': '#212121',
        'black-87': '#000000dd',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'Roboto',
          'Segoe UI',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
