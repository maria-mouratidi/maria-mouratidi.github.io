/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
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
