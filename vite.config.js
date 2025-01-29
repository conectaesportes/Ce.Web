import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { 
        target: 'http://168.138.145.159:55321', 
        changeOrigin: true, 
        secure: false
      }
    }
  }
})
