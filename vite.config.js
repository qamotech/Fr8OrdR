import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  build: {
    rollupOptions: {
      input: resolve(import.meta.dirname, 'dev.html'),
    },
  },
})
