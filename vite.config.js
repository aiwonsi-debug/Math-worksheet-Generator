import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
    cors: true
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-pdf': ['jspdf', 'html2canvas'],
          'vendor-konva': ['konva', 'react-konva', 'react-konva-utils'],
          'vendor-tabler': ['@tabler/icons-react']
        }
      }
    }
  }
})
