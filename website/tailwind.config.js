const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out forwards',
      },
      backgroundOpacity: {
        15: '0.15',
      },
      boxShadow: {
        signUp: '0px 5px 10px rgba(4, 10, 34, 0.2)',
        image: '0px 3px 30px rgba(9, 14, 52, 0.1)',
        pricing: '0px 34px 68px rgba(0, 0, 0, 0.06)',
        testimonial: '0px 8px 40px -10px rgba(9, 14, 52, 0.1)',
        service: '0px 11px 41px -11px rgba(9, 14, 52, 0.1)',
        blog: '0px 40px 150px -35px rgba(0, 0, 0, 0.05)',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      width: {
        500: '500px',
      },
      height: {
        500: '500px',
      },
      colors: {
        'transparent': 'transparent',
        'current': 'currentColor',

        'black': '#090E34',
        'dark': '#1D2144',
        // 'primary': '#4A6CF7',
        'yellow': '#FBB040',
        'body-color': '#959CB1',

        'gray': {
          DEFAULT: '#282d34',
          50: '#f9fafb',
          100: '#eaeaeb',
          200: '#cacbcd',
          300: '#a7a9ac',
          400: '#696c71',
          500: '#282d34',
          600: '#24292f',
          700: '#181b20',
          800: '#121518',
          900: '#0c0e10',
        },
        'primary': {
          DEFAULT: '#7A57F5',
          50: '#FFFFFF',
          100: '#F4F1FE',
          200: '#D5CAFC',
          300: '#B7A4F9',
          400: '#987DF7',
          500: '#7A57F5',
          600: '#5022F2',
          700: '#380DCF',
          800: '#2A099A',
          900: '#1B0665',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      zIndex: {
        '-1': -1,
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
