/** @type {import('tailwindcss').Config} */
export default {
  // Tells the tailwind to use class-based dark mode
  darkMode: 'class', 

  content: [
    "./index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}