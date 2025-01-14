/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateAreas: {
        layout: [
          "temp temp feels",
          "windSpeed    humidity   conditions",
          "nav    footer footer",
        ],
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
