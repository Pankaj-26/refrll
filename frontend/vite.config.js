import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
   darkMode: 'class',
  plugins: [react(),  tailwindcss(),],
 

  css: {
    devSourcemap: true, 
  },
  optimizeDeps: {
   
  },
   build: { outDir: 'dist' },
  server: { open: true },
  base: '/',
  //  server:{
  //   proxy: {
  //     '/api': {
  //       target: 'https://refrll-backend.onrender.com', 
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   }
  //  }
})
