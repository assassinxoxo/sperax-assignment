/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["IBM Plex Sans"],
    },

    extend: {
      boxShadow: {
        lightButtonShadow: "2px 2px 7px 0px rgba(0, 0, 0, 0.28)",
        cardShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.30)",
        footerShadow: "2px 4px 8px 0px rgba(0, 0, 0, 0.11)",
      },
      keyframes: {},
    },
  },
  plugins: [],
};
