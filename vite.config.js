import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression() 
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5080'
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
