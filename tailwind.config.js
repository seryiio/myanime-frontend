const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '3-max-content-center': '0.5fr 1fr 0.5fr',
        'auto-col': 'repeat(auto-fill,minmax(150px,1fr))',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

