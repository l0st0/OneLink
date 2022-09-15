/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#64A0FA',
        secondary: '#0E1C40',
        success: '#2c9c3e',
        error: '#e31021',
        gray: '#8d8f8d',
        black: '#000000',
        white: '#ebebeb',
      },

      borderRadius: {
        primary: '12px',
      },
      fontFamily: {
        main: ['"Raleway"', 'sans-serif'],
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
