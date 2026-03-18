/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0a192f",
          950: "#020617",
        },
        charcoal: {
          950: "#050505",
        },
        accent: {
          cyan: "#00d2ff",
          purple: "#9d50bb",
        },
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glass: "0 18px 60px rgba(15,23,42,0.9)",
        glow: "0 0 40px rgba(56,189,248,0.35)",
      },
      borderRadius: {
        "3xl": "1.75rem",
      },
      backdropBlur: {
        xs: "6px",
      },
    },
  },
  plugins: [],
};

