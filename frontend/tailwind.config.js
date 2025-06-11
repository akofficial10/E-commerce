/** @type {import('tailwindcss').config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          custom: "#276AB3",
        },
      },
    },
  },
  plugins: [],
};
