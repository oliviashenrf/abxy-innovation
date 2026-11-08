import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {},
      colors: {"border":"rgb(from var(--border) r g b / <alpha-value>)","input":"rgb(from var(--input) r g b / <alpha-value>)","ring":"rgb(from var(--ring) r g b / <alpha-value>)","background":"rgb(from var(--background) r g b / <alpha-value>)","foreground":"rgb(from var(--foreground) r g b / <alpha-value>)","primary":{"DEFAULT":"rgb(from var(--primary) r g b / <alpha-value>)","foreground":"rgb(from var(--primary-foreground) r g b / <alpha-value>)"},"secondary":{"DEFAULT":"rgb(from var(--secondary) r g b / <alpha-value>)","foreground":"rgb(from var(--secondary-foreground) r g b / <alpha-value>)"},"destructive":{"DEFAULT":"rgb(from var(--destructive) r g b / <alpha-value>)","foreground":"rgb(from var(--destructive-foreground) r g b / <alpha-value>)"},"muted":{"DEFAULT":"rgb(from var(--muted) r g b / <alpha-value>)","foreground":"rgb(from var(--muted-foreground) r g b / <alpha-value>)"},"accent":{"DEFAULT":"rgb(from var(--accent) r g b / <alpha-value>)","foreground":"rgb(from var(--accent-foreground) r g b / <alpha-value>)"},"popover":{"DEFAULT":"rgb(from var(--popover) r g b / <alpha-value>)","foreground":"rgb(from var(--popover-foreground) r g b / <alpha-value>)"},"card":{"DEFAULT":"rgb(from var(--card) r g b / <alpha-value>)","foreground":"rgb(from var(--card-foreground) r g b / <alpha-value>)"},"white":"rgb(from var(--white) r g b / <alpha-value>)","color-1":"rgb(from var(--color-1) r g b / <alpha-value>)","color-2":"rgb(from var(--color-2) r g b / <alpha-value>)","color-3":"rgb(from var(--color-3) r g b / <alpha-value>)","color-4":"rgb(from var(--color-4) r g b / <alpha-value>)","color-5":"rgb(from var(--color-5) r g b / <alpha-value>)","color-6":"rgb(from var(--color-6) r g b / <alpha-value>)","color-7":"rgb(from var(--color-7) r g b / <alpha-value>)"},
      borderRadius: {
        sm: "calc(var(--radius) - 6px)",
        DEFAULT: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 12px)",
      },
    },
  },
  plugins: [containerQueries, typography],
};
