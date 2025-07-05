// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // now Tailwind will generate .bg-tertiary
        tertiary: "var(--tertiary)",
        "tertiary-hover": "var(--tertiary-hover)",
      },
    },
  },
  plugins: [require("daisyui")],
};
