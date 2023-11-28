/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'bg1': '#161616',
        'bg2': '#323232',
        'myred': '#d3241c',
        'blue': '#184674',
      },
      boxShadow: {
        'myshadow': 'inset 0 0 10px #184674'
      }
    },
  },
  plugins: [],
}

