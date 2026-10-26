import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            DEFAULT: "#173447",
            dark: "#102B3C",
            light: "#234a64",
            50: "#f0f5f8",
            100: "#dbe7ee",
            200: "#b8d0de",
            800: "#173447",
            900: "#102B3C",
          },
          emerald: {
            DEFAULT: "#168963",
            dark: "#106d4e",
            light: "#1cb180",
            hover: "#137a58",
            50: "#F0F8F5",
            100: "#dcf0e7",
            500: "#168963",
            600: "#127554",
          },
          mint: "#F0F8F5",
          surface: "#F7F9FA",
          text: "#465562",
          heading: "#102B3C",
          border: "#DFE7E9",
          muted: "#6B7C8C",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 2px 8px -2px rgba(16, 43, 60, 0.05), 0 1px 4px -1px rgba(16, 43, 60, 0.03)",
        "card-hover": "0 10px 25px -5px rgba(16, 43, 60, 0.08), 0 8px 10px -6px rgba(16, 43, 60, 0.04)",
        nav: "0 2px 12px 0 rgba(16, 43, 60, 0.04)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
