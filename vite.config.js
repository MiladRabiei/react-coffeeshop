import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-coffeeshop/',
  optimizeDeps: {
    include: ["@ckeditor/ckeditor5-build-classic", "@ckeditor/ckeditor5-react"]
  }
})
