/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },

    plugins: [require("daisyui")],
    daisyui: {
      themes: ["light", "cupcake"], // Remove "dark" from the theme list
    },
  };

