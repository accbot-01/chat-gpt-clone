import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // BUG-001 FIX: Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code for better caching
          'react-vendor': ['react', 'react-dom'],
          'markdown-vendor': ['react-markdown'],
          'syntax-highlighter': ['react-syntax-highlighter'],
        },
      },
    },
    // Enable minification
    minify: 'terser',
    // Target modern browsers for smaller bundle
    target: 'es2020',
  },
})
