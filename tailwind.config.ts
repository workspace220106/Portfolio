import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#947EB0",
        accent: "#2F0A85",
        background: "#0a0a0f",
        "background-alt": "#111118",
        highlight: "#FBFEFB",
        surface: {
          DEFAULT: "rgba(255,255,255,0.05)",
          hover: "rgba(255,255,255,0.08)",
          active: "rgba(255,255,255,0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "ui-sans-serif", "sans-serif"],
        display: [
          "var(--font-space)",
          "system-ui",
          "ui-sans-serif",
          "sans-serif",
        ],
      },
      boxShadow: {
        "glass-lg":
          "0 18px 50px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)",
        "glass-sm":
          "0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)",
        metallic:
          "0 0 30px rgba(148, 126, 176, 0.45), 0 0 80px rgba(47, 10, 133, 0.4)",
        "metallic-sm":
          "0 0 15px rgba(148, 126, 176, 0.3), 0 0 40px rgba(47, 10, 133, 0.25)",
        glow: "0 0 20px rgba(148, 126, 176, 0.6), 0 0 60px rgba(47, 10, 133, 0.3)",
      },
      backgroundImage: {
        "metal-radial":
          "radial-gradient(circle at 10% 0%, #947EB0 0, transparent 55%), radial-gradient(circle at 80% 0%, #2F0A85 0, transparent 55%)",
        "glass-grid":
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundSize: {
        "glass-grid": "80px 80px",
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        float: "float-gentle 4s ease-in-out infinite",
        "float-medium": "float-medium 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "slide-up": "slide-up-fade 0.6s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        ripple: "ripple 1.5s ease-out infinite",
        "fade-in": "fade-in 0.8s ease-out",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.23, 1, 0.32, 1)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
