/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {backgroundColor: {
      'custom-blue': '#DEF2FF',
    },},
  },
  plugins: [require('@tailwindcss/forms'),
],
}

