import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/assets': '/src/assets',
      '@/components': '/src/components',
      '@/helpers': '/src/helpers',
      '@/hooks': '/src/hooks',
      '@/lib': '/src/lib',
      '@/services': '/src/services',
      '@/store': '/src/store',
      '@/styles': '/src/styles',
      '@/types': '/src/types'
    }
  }
});
