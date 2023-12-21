/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'bg1': '#161616',
        'bg2': '#323232',
        'myred': '#d3241c',
        'myblue': '#184674',
        'mygray': '#1d1e1f',
        'mygray2': '#252627',
        'mygray3': '#303030',
      },
      boxShadow: {
        'myshadow': 'inset 0 0 10px #184674',
      },
      fontSize: {
        small: '0.563rem',
      },
      screens: {
        xs: '500px',
        "3xl": '2000px',
      }
    },
  },
  plugins: [],
}

