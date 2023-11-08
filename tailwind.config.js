/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'custom-light-blue': '#DEF2FF',
            'custom-blue' : '#0099FF',
            'custom-dark-blue' : '#003EAE',
            'custom-hover-blue' : '#003EFF',
            'custom-brown' : '#673E00',
            'custom-grey' : '#687182',
            'custom-light-grey' : '#F7F9FC',
            'custom-green' : '#10CA00',
            'custom-light-green' : '#E1FCEF',
            'custom-yellow' : '#FFD700',
            'custom-light-yellow' :'FEF7D1',
            'custom-red': '#FF0000',
            'custom-light-red' : '#FFD0D0',
            'custom-black' : '#000000'
        },
      }
    },
  plugins: [],
}

