import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: process.env.PORT || 3000, // Usa el puerto 3000 localmente o el que asigne Railway
    host: true, // Permite acceder a la app desde la red
  },
  base: './',
})
