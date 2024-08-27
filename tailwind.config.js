const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "scroll": {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "dropdown":{
          from: {opacity: 0, transform: "translateY(-24px)"},
          to:{opacity: 1, transform: "translateY(0)"},
        },
        "dropdown2":{
          from: {opacity: 0, transform: "scale(0)"},
          to:{opacity: 1, transform: "scale(1)"},
        },
        "dropup":{
          from: {opacity: 1, transform: "translateY(0)"},
          to:{opacity: 0, transform: "translateY(-24px)"},
        },
        "dropup2":{
          from: {opacity: 1, transform: "scale(1)"},
          to:{opacity: 0, transform: "scale(0)"},
        },
      },
      animation: {
        "scroll": "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "dropdown": "dropdown 0.4s forwards",
        "dropdown2": "dropdown2 0.4s ease-out",
        "dropup": "dropup 0.4s forwards",
        "dropup2": "dropup2 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),
    addVariablesForColors,
    nextui(),
  ],
}

function addVariablesForColors(config) {
  const { addBase, theme } = config;
  
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}