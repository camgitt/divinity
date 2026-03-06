/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef5fb',
          100: '#d4e4f4',
          200: '#a9c9e9',
          300: '#7eaedd',
          400: '#5393d2',
          500: '#1f4e79',
          600: '#1a4268',
          700: '#153556',
          800: '#102944',
          900: '#0b1c33',
        },
        gold: {
          50: '#faf6ee',
          100: '#f2e8d0',
          200: '#e5d1a1',
          300: '#d4b56e',
          400: '#c9a84c',
          500: '#aa9058',
          600: '#8f7744',
          700: '#745e34',
          800: '#594724',
          900: '#3e3018',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        breathe: { "0%, 100%": { transform: "scale(1)", opacity: "0.6" }, "50%": { transform: "scale(1.15)", opacity: "1" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        breathe: "breathe 8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
