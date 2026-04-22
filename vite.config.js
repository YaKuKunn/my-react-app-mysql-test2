import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 核心魔法：把所有以 /api 开头的请求，都偷偷转发给 Java 后端
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})