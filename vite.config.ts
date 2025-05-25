import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0, // Ensure JSON files are copied to dist
  },
  optimizeDeps: {
    include: ['*.json'], // Pre-bundle JSON files
  },
})
