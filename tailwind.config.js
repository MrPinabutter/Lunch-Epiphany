/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.5)", visibility: "visible" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(0)", visibility: "hidden" },
        },

        wiggle: {
          "0%, 100%": {
            transform: "rotate(30deg) translateY(200px)",
            opacity: "0.8",
          },
          "30%": { opacity: "0" },
          "50%": {
            transform: "rotate(45deg) translateY(200px)",
            opacity: "0.8",
          },
          "65%": { opacity: "0" },
          "75%": { opacity: "0.8" },
          "90%": { opacity: "0" },
        },
        wiggle2: {
          "0%, 100%": {
            transform: "rotate(-30deg) translateY(200px)",
            opacity: "0.8",
          },
          "20%": { opacity: "0" },
          "35%": { opacity: "0.8" },
          "60%": {
            transform: "rotate(-45deg) translateY(200px)",
            opacity: "0",
          },
          "80%": { opacity: "0.8" },
        },
      },
      animation: {
        wiggle: "wiggle 2s infinite",
        wiggle2: "wiggle2 2.5s infinite",
        pop: "pop 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
