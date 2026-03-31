import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)"
        },
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)"
        },
        border: {
          soft: "var(--border-soft)",
          strong: "var(--border-strong)"
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)"
        },
        accent: {
          DEFAULT: "var(--accent-primary)",
          hover: "var(--accent-hover)"
        },
        system: {
          blue: "var(--system-blue)"
        },
        success: "var(--status-success)",
        warning: "var(--status-warning)",
        danger: "var(--status-danger)"
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        mono: "var(--font-mono)"
      },
      boxShadow: {
        soft: "0 24px 64px rgba(0, 0, 0, 0.35)",
        halo: "0 0 0 1px rgba(255,255,255,0.06), 0 16px 50px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(135deg, var(--accent-primary), var(--accent-hover))"
      }
    }
  },
  plugins: []
};

export default config;
