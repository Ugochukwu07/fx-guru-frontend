import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8002/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/bitfx': {
        target: 'https://api.bitfxpay.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bitfx/, '')
      }
    }
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
