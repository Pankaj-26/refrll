// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: 'class',  // <-- This enables class-based dark mode
//   content: [
//     './index.html',
//     './src/**/*.{js,jsx,ts,tsx}',
//   ],
//   theme: {
//   extend: {
//     colors: {
//       dark: '#0f0f0f',
//       card: '#1a1a1a',
//       text: '#f0f0f0',
//       accent: '#3b82f6', // blue
//     },
//   },
// },
//   plugins: [],
// }


module.exports = {
  darkMode: ['className', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // Remove the extend section and define colors directly
  theme: {
    colors: {
      dark: '#0f0f0f',
      card: '#1a1a1a',
      text: '#f0f0f0',
      accent: '#3b82f6',
      // Add default colors to prevent override
      white: '#ffffff',
      black: '#000000',
      // ... other colors you need
    },
  },
  plugins: [],
}