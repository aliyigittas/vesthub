/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backColor: '#e5e7e6',
        button: {
          primary: '#284243',
          primaryHover: '#1f3a36',
          secondary: '#d17c57',
          secondaryHover: '#b86b4b'
        },
        text: {
          black: '#000000',
          white: '#ffffff'
        }
      },
    },
    
  },
  plugins: [],
}

