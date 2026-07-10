/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/**/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'dark-brown': '#1B1714',
        'warm-gray': '#B9B4A9',
        'soft-beige': '#DOCDC4',
        'off-white': '#EDEDE8',
      }
    },
  },
  plugins: [],
}