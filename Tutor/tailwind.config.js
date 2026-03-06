/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Blue palette
        'royal-blue': {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c2d4ff',
          300: '#a3bfff',
          400: '#4f7fcc',
          500: '#1e3a8a', // Main Royal Blue
          600: '#1e40af',
          700: '#1f3a93',
          800: '#1c2d6f',
          900: '#192452',
        },
        // Golden Mustard palette
        'golden-mustard': {
          50: '#fffbf0',
          100: '#fff8e1',
          200: '#ffedac',
          300: '#ffe082',
          400: '#ffd54f',
          500: '#d4a574', // Main Golden Mustard
          600: '#f9a825',
          700: '#f57f17',
          800: '#f57c00',
          900: '#e65100',
        },
      },
    },
  },
  plugins: [],
}
