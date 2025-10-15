// vitest.config.ts

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()], // ✅ tambahkan ini
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@/mocks': path.resolve(__dirname, 'src/mocks'),
      '@/models': path.resolve(__dirname, 'src/models'),
      '@/services': path.resolve(__dirname, 'src/services'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/app': path.resolve(__dirname, 'src/app'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
    },
  },
});
