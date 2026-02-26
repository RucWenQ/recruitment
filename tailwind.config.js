/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Source Serif 4", "ui-serif", "serif"],
      },
      colors: {
        ink: "#0f172a",
        slate: {
          25: "#f8fafc",
        },
      },
      boxShadow: {
        soft: "0 20px 45px -30px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
}