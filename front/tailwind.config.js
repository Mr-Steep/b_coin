/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBgColor: '#000000',
        secondaryBgColor: '#0B2D44',
        textColor: '#FFFFFF',
        buttonBgColor: '#BCE5ED',
        buttonHoverBgColor: '#c9eaf1',
        errorColor: '#EB5757'
      },
      screens: {
        sx: {
          max: '490px'
        },
        sm: {
          max: '768px'
        },
        smn: {
          min: '768px'
        },
        tablet: {
          max: '991px'
        },
        md: {
          max: '1268px'
        },
        mdd: {
          max: '1280px'
        },

        mdm: {
          min: '1280px'
        },

        lg: {
          max: '1440px'
        },
        lgm: {
          min: '1440px'
        },


      }
    },
  },
  plugins: [],
}

