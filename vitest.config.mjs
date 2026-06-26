import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.js',
  },
  resolve: {
    alias: {
      // Mirror the "@/*" -> "./src/*" alias from jsconfig.json
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
