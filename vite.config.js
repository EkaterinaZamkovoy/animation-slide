import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './',
  base: '/animation-slide/',
  build: {
    outDir: 'animation-slide',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: 'js/[name].js',
        assetFileNames: (info) => {
          const name = info.names?.[0] || '';

          if (name.endsWith('.css')) return 'sass/[name][extname]';
          if (/\.(ttf|woff2?|otf)$/.test(name)) return 'fonts/[name][extname]';
          return 'img/[name][extname]';
        },
      },
    },
  },
});
