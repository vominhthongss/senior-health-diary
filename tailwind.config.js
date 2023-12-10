/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  content: ["./App.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#1876d1",
      },
    },
  },
  plugins: [],
};
