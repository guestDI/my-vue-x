/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        '600': '500px',
      },
      maxHeight: {
        '90vh': '90vh'
      },
      maxWidth: {
        '70vw': '70vw'
      }
    },
  },
  plugins: [],
}

