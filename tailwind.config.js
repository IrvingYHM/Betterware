/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        danger: "#FFD099",
        turquesa: "#19BDFD",
        betterware: "#0b9ca7",
        betterware_card: "#65bed4",
        betterware_claro: "#04acc9",
        aRey: "#1446F5",
        azulOp: "#6786F6",
        naranja: {
          50: "#fff1e6", // más claro
          100: "#ffe0cc",
          200: "#ffc199",
          300: "#ffa366",
          400: "#ff8433",
          500: "#ff6900", // igual que DEFAULT
          600: "#cc5500", // más oscuro
          700: "#994000",
          800: "#662b00",
          900: "#331500", // muy oscuro
        },
      },
      spacing: {
        /*         22:"88px", */
        "5/8": "38px",
      },
      translate: {
        90: "22.5rem",
      },
    },
  },
  plugins: [],
};
