/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: "#635FC7",
        "primary-hover": "#A8A4FF",
        destructive: "#EA5555",
        "destructive-hover": "#FF9898",
        light: "#F4F7FD",
        dark: {
          bg: "#20212C",
          card: "#2B2C37",
          line: "#3E3F4E",
        },
        mediumGray: "#828FA3",
        lines: "#E4EBFA",
      },
    },
  },
  plugins: [],
};
