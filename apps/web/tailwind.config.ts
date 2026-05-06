/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/web/**/*.{js,ts,jsx,tsx}',
    './apps/mobile/**/*.{js,ts,jsx,tsx}', // якщо хочеш використовувати Tailwind у mobile
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};