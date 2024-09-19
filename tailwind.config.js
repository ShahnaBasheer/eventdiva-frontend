// tailwind.config.js
/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        itim: ['Itim', 'cursive'],
        josefin: ['Josefin Sans', 'sans-serif'],
        actor: ['Actor', 'sans-serif'],
        amaranth: ['Amaranth', 'sans-serif'],
        saira: ['Saira', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        cagliostro: ['Cagliostro', 'sans-serif'],
      },
      boxShadow: {
        custom: "rgba(50, 50, 93, 0.25) 0px 6px 10px -2px, rgba(0, 0, 0, 0.3) 0px -2px 5px -2px",
        chat: "rgba(0, 0, 0, 0.19) 0px 10px 5px, rgba(0, 0, 0, 0.70) 0px 10px 20px",
      },
      colors: {
        white: "#fff",
        gray: {
          100: "#fbfbfb",
          200: "#fafafa",
          300: "#929292",
          400: "#837f7f",
          500: "#807d7d",
          600: "#2a2b2b",
          700: "#272727",
          800: "#1d1d1f",
          900: "#12060e",
          1000: "rgba(0, 0, 0, 0.5)",
          1100: "rgba(255, 255, 255, 0.48)",
          1200: "rgba(255, 255, 255, 0.2)",
        },
        slateblue: "#484bbe",
        darkslategray: {
          100: "#424242",
          200: "#403f3f",
          300: "#3d3e3e",
        },
        silver: "#c4c4c4",
        black: "#000",
        adminBlue: "#3749A6",
        whitesmoke: {
          100: "#f8f5f5",
          200: "#f1f1f1",
        },
        darkturquoise: {
          100: "#37d5ea",
          200: "#3ac3d6",
        },
        cadetblue: "#05a1b8",
        royalblue: {
          100: "#4463ce",
          200: "#4358cb",
          300: "#1d68d9",
        },
        dodgerblue: {
          100: "#6b8af5",
          200: "#428fff",
        },
        cornflowerblue: "#3f7cd7",
        dimgray: {
          100: "#676e6e",
          200: "#6a6666",
          300: "#515151",
          400: "#505050",
          500: "#4f4f4f",
        },
        blueviolet: "#9747ff",
        steelblue: {
          100: "#2d80bc",
          200: "#1285b6",
        },
        darkgray: {
          100: "#b2aeae",
          200: "#a39f9f",
        },
        tomato: "#fa5c5c",
        green: "#19a31e",
        gainsboro: {
          100: "#d9d9d9",
          200: "rgba(230, 230, 230, 0.48)",
        },
        lightgray: "#cecfce",
      },
      borderRadius: {
        "3xs": "10px",
        mini: "15px",
        "11xl": "30px",
        xl: "20px",
        "8xs": "5px",
      },
    },
    fontSize: {
      xs: "0.75rem",
      xl: "1.25rem",
      base: "1rem",
      lg: "1.125rem",
      lgi: "1.188rem",
      "5xl": "1.5rem",
      "13xl": "2rem",
      "7xl": "1.625rem",
      "2xl": "1.313rem",
      mid: "1.063rem",
      "19xl": "2.375rem",
      "4xl": "1.438rem",
      "11xl": "1.875rem",
      sm: "0.875rem",
      "base-2": "0.95rem",
      smi: "0.813rem",
      inherit: "inherit",
    },
  },
  plugins: [
    require('autoprefixer'),
    require('flowbite/plugin'),
  ],
}
