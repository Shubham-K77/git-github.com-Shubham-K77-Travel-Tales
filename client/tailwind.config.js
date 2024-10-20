/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sansSerif: ['"Poppins"', "sans-serif"],
      cursive: ['"Dancing Script"', "cursive"],
      montserrat: ['"Montserrat"', "sans-serif"],
      notosans: ['"Noto Sans"', "sans-serif"],
    },
  },
  plugins: [],
};
