module.exports = {
  content: [
    './App.tsx',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#18d627',
        'custom-yellow': '#faf682',
        'custom-red': '#f73e3e',
      },
      spacing: {
        'extra-small': '4px',
        'extra-large': '64px',
      },
    },
  },
  plugins: [],
}
