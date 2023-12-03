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
        'gray': '#1d1e1f',
        'gray2': '#252627',
        'gray3': '#303030',
      },
      boxShadow: {
        'myshadow': 'inset 0 0 10px #184674',
      },
      fontSize: {
        small: '0.563rem',
      }
    },
  },
  plugins: [],
}

