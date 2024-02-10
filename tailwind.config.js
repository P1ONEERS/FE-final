/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // add this line
  ],
  theme: {
    extend: {
      scale: {
        130: "1.75",
      },
      margin: {
        turun: "90",
      },
      rotate: {
        43.61: "6deg",
      },
      backgroundPosition: {
        "top-70": "center 70%",
      },
      backgroundColor: {
        buttonhijau: "#40787",
        // Add other custom colors as needed
      },
    },
  },
  plugins: [],
};
