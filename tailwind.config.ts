import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        steel: { DEFAULT: "#E8EBEC", dark: "#CDD3D6" },
        mist: "#F5F6F7",
        graphite: "#2A3036",
        ink: "#1C2125",
        slate: "#5B6670",
        signal: { DEFAULT: "#ED2028", dark: "#C4141B" },
        process: { cyan: "#00A0E3", magenta: "#E5007E", yellow: "#FFE000", key: "#1E1E1E" },
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      maxWidth: { prose: "68ch" },
    },
  },
  plugins: [],
};
export default config;
