module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths according to your project structure
    './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
