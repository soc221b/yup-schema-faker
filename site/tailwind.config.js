const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.vue'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        white: 'black',
        black: 'grey',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
