/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['"Raleway"', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        white: '#ebebeb',
        primary: '#64A0FA',
        secondary: '#0E1C40',
        success: '#2c9c3e',
        error: '#e31021',
        gray: '#8d8f8d',
      },
      borderRadius: {
        primary: '12px',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
