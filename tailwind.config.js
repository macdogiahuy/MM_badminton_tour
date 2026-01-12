/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        'primary': '#3b82f6',
        'accent': '#fbbf24',
        'dark-bg': '#0f172a', // Darker blue-ish slate
        'panel': 'rgba(30, 41, 59, 0.7)', // Slate 800 with opacity
      }
    },
  },
  plugins: [],
}
