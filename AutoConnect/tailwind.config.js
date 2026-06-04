/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0D2B45",
          dark:    "#091e30",
          light:   "#1a4a6e",
        },
        accent: {
          DEFAULT: "#1DB954",
          dark:    "#17a348",
        },
        danger:  "#E53935",
        surface: "#F5F6F8",
        card:    "#FFFFFF",
        muted:   "#6B7280",
        border:  "#E5E7EB",
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      borderRadius: {
        xl2: "1rem",
        xl3: "1.5rem",
      },
      boxShadow: {
        card:     "0 2px 12px rgba(0,0,0,0.08)",
        cardHover:"0 8px 28px rgba(0,0,0,0.14)",
      },
    },
  },
  plugins: [],
}