const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.slate,
        accent: colors.violet,
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
      }
    },
  },
  plugins: [],
};
