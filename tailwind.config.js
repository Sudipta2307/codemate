/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "dark",
      "light",
      "emerald",
      "corporate",
      "pastel",
      "black",
      "autumn",
      "nord",
      "silk",
      "abyss",
    ],
  },
};