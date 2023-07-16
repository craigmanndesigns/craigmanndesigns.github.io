/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ["Playfair Display SC", "serif"],
      sans: ["Roboto", "sans-serif"],
    },
    colors: {
      "dark-slate": "#3b3b3b",
      "light-slate": "#b3b3b3",
      white10: "rgba(255, 255, 255, .1)",
      black10: "rgba(27, 27, 27, .1)",
      black80: "rgba(27, 27, 27, .8)",
      accent: "#61E8D3",
      lightWhite: "#E9E9E9",
    },
    minHeight: {
      default: "100vh",
      defaultTab: "calc(100vh - 2rem)",
      defaultMob: "50vh",
      scroll: "10rem",
      scrollTab: "8rem",
      hero: "calc(100vh - 2rem)",
    },
    maxWidth: {
      default: "calc(100vw - 2rem)",
      40: "50vw",
      80: "80vw",
      full: "100%",
      scrollMob: "calc(100vw - 4rem)",
    },
    minWidth: {
      50: "50%",
      66: "66%",
    },
    gridColumn: {
      default: "auto / span 4",
      half: "auto / span 6",
      quarter: "auto / span 3",
      full: "auto / span 12",
      sixth: "auto / span 2",
      content: "auto / span 10",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#1b1b1b",
      white: "#ffffff",
    },
    animation: {
      scroll: "scroll 20s linear infinite",
    },

    extend: {
      borderColor: {
        accent: "#61E8D3",
      },
      backgroundColor: {
        "dark-slate": "#3b3b3b",
        "light-slate": "#b3b3b3",
      },
      colors: {
        white: "#fff",
        "dark-slate": "#3b3b3b",
        "light-slate": "#b3b3b3",
        white10: "rgba(255, 255, 255, .1)",
        black10: "rgba(27, 27, 27, .05)",
        black80: "rgba(27, 27, 27, .9)",
        accent10: "rgba(97, 232, 211, .1)",
        accent: "#61E8D3",
        lightWhite: "#E9E9E9",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      spacing: {
        separator: "-2rem",
        separatorMob: "-1rem",
      },
    },
  },
  plugins: [],
};
