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
        md: {
          max: '1268px'
        },
        lg: {
          max: '1440px'
        }
      }
    },
  },
  plugins: [],
}

