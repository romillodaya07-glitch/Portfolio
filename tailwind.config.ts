import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bold & playful, rainbow pop
        ink: "#15121c",
        paper: "#faf4e6",
        card: "#ffffff",
        electric: {
          DEFAULT: "#2f4bff",
          bright: "#5a72ff",
          deep: "#1b32d6",
        },
        gold: {
          DEFAULT: "#ffcf33",
          amber: "#ffb703",
        },
        pop: {
          blue: "#2f4bff",
          red: "#ff4b3e",
          green: "#1faa59",
          purple: "#7b5cff",
          orange: "#ff7a00",
          yellow: "#ffcf33",
          pink: "#ff5ca8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "blob-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(4%, -5%) scale(1.1)" },
          "66%": { transform: "translate(-4%, 4%) scale(0.92)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-reverse":
          "marquee-reverse var(--marquee-duration, 40s) linear infinite",
        "blob-drift": "blob-drift 16s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
