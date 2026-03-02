/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'boot': 'cubic-bezier(0.8, 0, 0.2, 1)',
      },
      backdropBlur: {
        '3xl': '30px',
      }
    },
  },
  plugins: [],
}
