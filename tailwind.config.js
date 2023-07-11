/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        MAIN_BG: "#000000",
        NAV_BG: "#188fcd",
        COMPONENT_BG: "#028cc9",
      },

    },
  },
  plugins: [],
};
