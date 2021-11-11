const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors : {
        lime : colors.lime,
        sky : colors.sky,
        customBg:'#EBEDF3',
      },
      fontFamily : {
        'font-poppins' : 'Poppins'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
