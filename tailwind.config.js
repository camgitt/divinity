/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
