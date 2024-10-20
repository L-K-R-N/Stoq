import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   base: '/wp-content/uploads/dist/',
   resolve: {
      alias: {
         '@': path.resolve(__dirname, 'src'),
      },
   },
   css: {
      preprocessorOptions: {
         scss: {
            api: 'modern-compiler', // or "modern"
         },
      },
   },
   server: {
      port: 7000,
      host: '0.0.0.0',
   },
});
