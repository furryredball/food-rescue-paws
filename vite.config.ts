import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// BASE_PATH lets GitHub Pages serve from a repository subdirectory, e.g. /food-rescue-paws/
const base = process.env.BASE_PATH?.trim() || '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 4177,
    strictPort: true,
  },
  preview: {
    port: 4177,
    strictPort: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
