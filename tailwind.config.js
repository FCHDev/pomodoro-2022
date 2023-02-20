/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      main: ['Bakbak One', 'sans-serif'],
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'bleu-dark': '#22223B',
        'bleu': '#4A4E69',
        'gris-mauve': '#776975',
        'beige': '#C9ADA7',
        'beige-light': '#F2E9E4',
      },
    },
  },
  plugins: [],
}
