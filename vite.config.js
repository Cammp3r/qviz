import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config: dev server + build settings.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      // Index.html is used by Vite as entry; additional inputs can be added here.
      input: '/index.html'
    },
    chunkSizeWarningLimit: 600
  }
})
