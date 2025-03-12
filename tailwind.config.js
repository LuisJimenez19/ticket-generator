/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      neutral: "var(--neutral-0)",
      "neutral-3": "hsla(var(--neutral-300))",
      "neutral-5": "hsla(var(--neutral-500))",
      "neutral-7": "hsla(var(--neutral-700))",
      "neutral-9": "hsla(var(--neutral-900))",
      "orange-5": "hsla(var(--orange-500))",
      "orange-7": "hsla(var(--orange-700))",
    },

    fontFamily: {
      inconsolata: ["inconsolata", "serif"],
    },
    extend: {},
  },
  plugins: [],
};
