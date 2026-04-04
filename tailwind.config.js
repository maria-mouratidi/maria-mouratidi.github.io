/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dusty: {
          50:  "#fff1f4",
          100: "#ffe0e7",
          200: "#ffc2d1",
          300: "#ff9db3",
          400: "#f47a97",
          500: "#e8607e",
          600: "#d44d6b",
          700: "#be3f5c",
          800: "#a3364f",
          900: "#8a2e44",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        pulse: "pulse 8s infinite",
      },
      // ...existing code...
      dropShadow: {
        nav: "0 2px 6px rgba(0,0,0,0.65)",
      },
      zIndex: {
        modal: "2147483647",
        navbar: "50",
      },
    },
  },
  plugins: [],
};
