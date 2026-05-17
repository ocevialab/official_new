import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: "#f6f6f6",
      },
      fontFamily: {
        sans: ["Mokoto", "sans-serif"],
        Mokoto: ["Mokoto", "sans-serif"],
      },
    },
  },
  safelist: [
    "bg-[#916349]",
    "bg-[#683b21]",
    "bg-[#ffffff]",

    // Add more if needed
  ],
  plugins: [],
} satisfies Config;
