/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-color': '#FF6C47',
        'select-rgba': 'rgba(255, 228, 216, 0.5)',
        grey: {
          line: '#D7D7D7',
          background: '#F1F1F1',
          titleActive: '#1E2222',
          body: '#5C5C5C',
          label: '#888888',
          placeholder: '#BBBBBB',
          offWhite: '#FCFCFC',
        },
        primary: {
          orange: '#FF6C47',
          'orange-transparent': '#FFE4D8',
          lightOrange: '#FFE4D8',
          'lightOrange-2': '#FFF4EF',
          point: {
            blue: '#5E66F5',
            yellow: '#F5CC20',
            black: '#403F40',
          },
        },
        system: {
          error: '#F55A56',
          correct: '#32C896',
        },
      },
    },
  },
  plugins: [],
};
