import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
   darkMode: 'class',
  plugins: [react(),  tailwindcss(),],
  // plugins: [react(), ],

  css: {
    devSourcemap: true, // Enable CSS sourcemaps
    // postcss: {
    //   plugins: [require('tailwindcss'), require('autoprefixer')],
    // },
  },
  optimizeDeps: {
    // include: ['tailwindcss'],
  },
   server:{
    proxy: {
      '/api': {
        target: 'http://localhost:5000', 
        changeOrigin: true,
        secure: false,
      },
    }
   }
})
