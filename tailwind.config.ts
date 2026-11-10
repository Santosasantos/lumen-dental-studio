import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f2a2b",
        teal: { 50: "#eef7f6", 100: "#d5ecea", 600: "#1f6f6b", 700: "#17595a", 800: "#11443f", 900: "#0d3432" },
        cream: "#faf7f2",
        coral: "#e9775b",
      },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
      maxWidth: { site: "72rem" },
    },
  },
  plugins: [],
};
export default config;
