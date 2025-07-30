// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      webp: {
        quality: 80,
        effort: 6,
      },
      jpg: {
        quality: 80,
        progressive: true,
      },
      png: {
        quality: 80,
        compressionLevel: 9,
      },
    }),
  ],
  base: './', // ✅ S3 호스팅 시 상대 경로로 설정
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables";`,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})