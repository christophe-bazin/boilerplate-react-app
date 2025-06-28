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
        primary: '#3b82f6',    // Blue for brand
        secondary: '#64748b',  // Slate for neutral
      }
    },
  },
  plugins: [],
};
