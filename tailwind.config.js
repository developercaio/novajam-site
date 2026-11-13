/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        nexoDark: '#0e110e',
        nexoSurface: '#1b211a',
        nexoGreen: '#d5fc78',
      }
    },
  },
  plugins: [],
}
