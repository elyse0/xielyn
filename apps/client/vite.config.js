import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';

import path from 'path';

export default defineConfig({
  base: '/sophire/',
  plugins: [
    vue(),
    eslint({
      fix: true,
      exclude: [
        '**/node_modules/**',
        '**/sophire/packages/**',
      ]
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8080,
  },
  build: {
    target: 'esnext',
    cssCodeSplit: false,
  },
});
