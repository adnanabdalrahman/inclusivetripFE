import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Ensure the output directory matches your server configuration
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://www.barrierefrei-aufgerollt.at',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});