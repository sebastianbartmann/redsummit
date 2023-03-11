/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

const config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#54020c",
        },
      },
    ],
  },
  theme: {
    colors: {
      transparent: "transparent",
      white: "#eee5f7",
      black: colors.black,
      mainred: "#54020c",
      snd: "#860313",
      high: "#ed8a9d",
      dark: "#1c1d19",
      link: "#F48EA3",
      c1: "#F48EA3",
      c2: "#FE7472",
      c3: "#F64143",
      c4: "#FE7F62",
    },
  },

  plugins: [require("daisyui")],
};

module.exports = config;
