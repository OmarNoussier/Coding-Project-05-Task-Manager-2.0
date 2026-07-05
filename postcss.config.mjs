// PostCSS configuration for Tailwind CSS v4 registers "@tailwindcss/postcss", transforming `@import "tailwindcss";` in globals.css into the complete utility stylesheet.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
