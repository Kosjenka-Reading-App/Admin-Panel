/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {backgroundColor: {
      'custom-light-blue': '#DEF2FF',
      'custom-blue' : '#0099FF',
      'custom-dard-blue' : '#003EAE',
      'custom-brown' : '#673E00',
      'custom-grey' : '#D9D9D9',
      'custom-green' : '#10CA00',
      'custom-light-green' : '#E1FCEF',
      'custom-yellow' : '#FFD700',
      'custom-light-yellow' :'FEF7D1',
      'custom-red': '#FF0000',
      'custom-light-red' : '#FFD0D0',
      'custom-black' : '#000000'

    },},
  },
  plugins: [],
}

