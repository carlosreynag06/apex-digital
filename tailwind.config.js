/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind v4: configuración mínima; sin plugins externos.
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        "serene-dawn": "rgb(var(--color-serene-dawn) / <alpha-value>)",
        "soft-lavender": "rgb(var(--color-soft-lavender) / <alpha-value>)",
        "powder-blue": "rgb(var(--color-powder-blue) / <alpha-value>)",
        // Visible change: Added Misty Rose to the palette.
        "misty-rose": "rgb(var(--color-misty-rose) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
