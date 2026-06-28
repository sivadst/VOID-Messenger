/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        grey: '#888888',
        'dark-grey': '#444444',
      },
      fontFamily: {
        'dot-gothic': ['"DotGothic16"', 'sans-serif'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
        'jetbrains-mono': ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        base: '4px',
      },
      borderRadius: {
        none: '0px',
      },
      boxShadow: {
        none: 'none',
      },
    },
  },
  plugins: [],
}
