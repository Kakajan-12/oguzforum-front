/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        DEFAULT: "1420px",
      },
    },
    extend: {
      fontFamily: {
        proxima: ['"Proxima Nova"', "sans-serif"],
        "capitana-medium": ['"Capitana Medium"', "sans-serif"],
        "capitana-semibold": ['"Capitana Semibold"', "sans-serif"],
        "capitana-bold": ['"Capitana Bold"', "sans-serif"],
      },
      backgroundColor: {
        mainBlue: "#002A5F",
      },
      colors: {
        mainBlue: "#002A5F",
      },

      backgroundImage: {
        "custom-gradient":
          "linear-gradient(360deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 20, 45, 0.85) 90%)",
        gradient:
          "linear-gradient(180deg, #06306a 8.24%, #164194 72.85%, #006fb5 100.29%)",
        "hero-gradient":
          "linear-gradient(89.42deg, rgba(0, 0, 0, 0.6) 4.85%, rgba(0, 0, 0, 0.396) 34.83%, rgba(201, 218, 244, 0) 97.9%), linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
      },
    },
  },
  plugins: [],
};
