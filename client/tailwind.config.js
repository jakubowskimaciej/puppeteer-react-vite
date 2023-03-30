/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.vue", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0158ba",
        secondary: "#fcca03",
        third: "#2b2b47",
        quattro: "#014280",
      },
      fontFamily: {
        Montserrat: ["Montserrat, sans-serif"],
      },
      container: {
        padding: "2px",
        center: true,
      },
      screens: {
        sm: "640px",
        md: "768px",
      },
    },
  },
  plugins: [],
};
