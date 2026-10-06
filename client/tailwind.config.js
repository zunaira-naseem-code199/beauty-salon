/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#FBF4EE',
        blush: '#F7D9DC',
        petal: '#FCEBEC',
        rose: { gold: '#B76E79', deep: '#9A525D', soft: '#E3B7B0' },
        ink: '#0A0A0A',
      },
    },
  },
  plugins: [],
}
