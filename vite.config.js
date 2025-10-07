import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/yatraa/' : '/', // Conditional base path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true, // Enable for debugging
    // Copy public directory files with correct paths  
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
