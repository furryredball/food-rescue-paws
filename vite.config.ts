import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { resolveBasePath } from './vite.base.ts'

export default defineConfig({
  base: resolveBasePath(),
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
