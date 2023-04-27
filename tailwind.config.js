/** @type {import('tailwindcss').Config} */
import te from "tw-elements/dist/plugin.cjs";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [te],
  darkMode: "class",
};
