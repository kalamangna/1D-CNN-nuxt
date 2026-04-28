/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#ced9fd',
          300: '#a1b6fb',
          400: '#6f8cf8',
          500: '#4662f5',
          600: '#2d41eb',
          700: '#2330d7',
          800: '#2229ae',
          900: '#20288a',
          950: '#141755',
        },
      },
    },
  },
  plugins: [],
}
