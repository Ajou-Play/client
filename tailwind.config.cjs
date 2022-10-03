/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-color': '#FF6C47',
        'select-rgba': 'rgba(255, 228, 216, 0.5)',
      },
    },
  },
  plugins: [],
};
