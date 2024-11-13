import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        layout: "520px",
      },
      maxHeight: {
        layout: "780px",
      },
      fontFamily: {
        sans: ["NanumSquare", "sans-serif"],
      },
      fontSize: {
        "2xl": "32px",
        xl: "24px",
        lg: "16px",
        sm: "8px",
      },
      fontWeight: {
        regular: 400,
        bold: 700,
        extrabold: 800,
      },
      boxShadow: {
        far: "0 16px 32px -8px rgba(12, 12, 13, 0.4)",
        middle:
          "0 4px 4px -4px rgba(12, 12, 13, 0.05), 0 16px 16px -8px rgba(12, 12, 13, 0.1)",
        close:
          "0 4px 4px -4px rgba(12, 12, 13, 0.05), 0 16px 32px -4px rgba(12, 12, 13, 0.1)",
      },
      colors: {
        layout: {
          sidebar: "#E6EDF8",
          main: "#F0F4FA",
          background: "#D9E3F3",
        },
        primary: {
          DEFAULT: "#6E29DA",
          hover: "#4B0AAF",
          disabled: "#D3B7FF",
        },
        secondary: {
          DEFAULT: "#E4E9F5",
          hover: "#4A5D78",
          disabled: "#939BA5",
        },
        default: {
          DEFAULT: "#354357",
          hover: "#4A5D78",
          disabled: "#939BA5",
        },
        bettingBlue: {
          DEFAULT: "#4C79F8",
          disabled: "#C7D5F9",
        },
        bettingPink: {
          DEFAULT: "#DF3491",
          disabled: "#EAB2D6",
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".fixed-center": {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "fit-content",
          zIndex: "1000",
        },
      });
    }),
  ],
};
