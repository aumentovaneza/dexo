import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/css/app.css', 
        'resources/js/app.jsx'
      ],
      refresh: true,
    }),
    react(),
    tailwindcss({
      config: './tailwind.config.js',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('./resources/js'),
    },
  },
});

