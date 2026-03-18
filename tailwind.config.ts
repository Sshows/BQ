import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bq: {
          black: "#0A0A0A",
          dark: "#111111",
          gray: "#1A1A1A",
          muted: "#888888",
          accent: "#E8C547",
          white: "#F5F5F5",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        "soft-lg":
          "0 24px 60px -28px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.06)",
      },
      letterSpacing: {
        tighter2: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
