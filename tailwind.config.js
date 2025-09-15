/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
           primary: "rgb(var(--primary-color) / <alpha-value>)",
            pri: "rgb(22,66,60)",
           secondary: "rgb(var(--secondary-color) / <alpha-value>)",
          background: "rgb(var(--background-color) / <alpha-value>)",
          hover: "rgb(var(--hovering-effect) / <alpha-value>)",
          primarytext: "rgb(var(--primary-text) / <alpha-value>)",
          secondarytext: "rgb(var(--secondary-text) / <alpha-value>)",
},

    },
  },
  plugins: [],
}
