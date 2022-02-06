/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Poppins'", "sans-serif"],
        mono: ["Consolas", "Monaco", "Andale Mono", "Ubuntu Mono", "monospace"],
      },
      colors: {
        primary: colors.sky,
        gray: colors.neutral,
      },
      gridTemplateColumns: {
        card: "repeat(auto-fill, minmax(300px, 1fr))",
      },
      boxShadow: {
        light: "0 0 12px 0 rgba(0, 0, 0, 0.09)",
        "light-lg": "0 2px 20px 0 rgba(0, 0, 0, 0.09)",
        dark: "0 1px 1px 0 rgba(75, 85, 99, 0.3)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
