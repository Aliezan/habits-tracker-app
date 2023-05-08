/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif']
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('daisyui')
  ],
  daisyui: {
    themes: ["bumblebee"]
  }
}

