import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
        }
      },
      host: '0.0.0.0',
      allowedHosts: ['social-media-7-t580.onrender.com','https://social-media-3-oj14.onrender.com'],
    },
    esbuild: {
      jsxInject: `import React from 'react'`,
   },
})
