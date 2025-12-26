/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1DA2A9",
          50: "#f0fdfe",
          100: "#ccfbfe",
          200: "#99f6fe",
          300: "#66f0fe",
          400: "#1ee3e6",
          500: "#1DA2A9",
          600: "#167d83",
          700: "#0f5d62",
          800: "#083d41",
          900: "#041f21",
        },
        secondary: "#FF6B35",
        accent: "#1C3D5A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

