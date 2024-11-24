export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React files
  ],
  theme: {
    extend: {
      screens: {
        'sm-350': '350px', // min-width 350px
        'sm-500': { 'max': '500px' }, // max-width 500px
      },
    },
  },
  plugins: [],
};

