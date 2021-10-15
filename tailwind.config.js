/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      inset: {
        18: "4.5rem", // NavBar Height
      },
      fontFamily: {
        sans: ["'Poppins'", "sans-serif"],
        mono: ["Consolas", "Monaco", "Andale Mono", "Ubuntu Mono", "monospace"],
      },
      colors: {
        primary: colors.sky,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.blue.500"),
              "&:hover": {
                color: theme("colors.blue.600"),
              },
              code: { color: theme("colors.blue.400") },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.900"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.900"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.gray.900"),
            },
            "h4,h5,h6": {
              color: theme("colors.gray.900"),
            },
            "p > code": {
              color: theme("colors.blue.700"),
              backgroundColor: "#f5f7ff",
              padding: "0.3em 0.6em",
              borderRadius: "0.25rem",
            },
            "code:before": {
              content: "none",
            },
            "code:after": {
              content: "none",
            },
            hr: { borderColor: theme("colors.gray.200") },
            "ol li:before": {
              fontWeight: "600",
              color: theme("colors.gray.500"),
            },
            "ul li:before": {
              backgroundColor: theme("colors.gray.500"),
            },
            strong: { color: theme("colors.gray.600") },
            blockquote: {
              fontWeight: "400",
              color: theme("colors.gray.900"),
              borderLeftColor: theme("colors.gray.200"),
              paddingLeft: "0.6em",
            },
            pre: {
              color: "#111b27",
              backgroundColor: "#f5f7ff",
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.blue.500"),
              "&:hover": {
                color: theme("colors.blue.400"),
              },
              code: { color: theme("colors.blue.400") },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.100"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.100"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.gray.100"),
            },
            "h4,h5,h6": {
              color: theme("colors.gray.100"),
            },
            "p > code": {
              backgroundColor: "#0b2132",
              color: theme("colors.blue.400"),
            },
            hr: { borderColor: theme("colors.gray.700") },
            "ol li:before": {
              fontWeight: "600",
              color: theme("colors.gray.400"),
            },
            "ul li:before": {
              backgroundColor: theme("colors.gray.400"),
            },
            strong: { color: theme("colors.gray.100") },
            thead: {
              color: theme("colors.gray.100"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
            blockquote: {
              color: theme("colors.gray.100"),
              borderLeftColor: theme("colors.gray.700"),
            },
            pre: {
              color: "white",
              backgroundColor: "#011627",
            },
          },
        },
      }),
      boxShadow: {
        light: "0 0 12px 0 rgba(0, 0, 0, 0.09)",
        dark: "0 2px 12px 0 rgba(0, 0, 0, 0.18)",
      },
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [],
};
