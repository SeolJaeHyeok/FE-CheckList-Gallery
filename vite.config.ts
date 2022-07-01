import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    alias(),
    react(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@images', replacement: resolve(__dirname, 'src/images') },
      { find: '@lib', replacement: resolve(__dirname, 'src/lib') },
      { find: '@styles', replacement: resolve(__dirname, 'src/styles') },
      { find: '@interfaces', replacement: resolve(__dirname, 'src/interfaces') },
    ],
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  base: '/FE-CheckList-Gallery/',
});
