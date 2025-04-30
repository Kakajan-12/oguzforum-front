/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        mainBlue : '#002A5F'
      },
      colors: {
        mainBlue : '#002A5F'
      },
      backgroundImage: {
        'custom-gradient': "linear-gradient(360deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 20, 45, 0.85) 90%)",
      },
    },
  },
  plugins: [],
};
