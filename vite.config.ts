import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    host: 'localhost',
    port: 5173,
    proxy:{
      "/api":{
        "target": "http://120.79.209.43:8080",
        "secure":false,
        "changeOrigin":true,
        "rewrite":path=>path.replace(/^\/api/,'')
      }
    }
  }
})
