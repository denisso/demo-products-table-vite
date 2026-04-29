import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import svgr from 'vite-plugin-svgr';

const chunkGroups: Record<string, RegExp[]> = {
  first: [/node_modules\/react\//, /node_modules\/react-dom\//],
  second: [
    /node_modules\/zustand\//,
    /node_modules\/@tanstack\/react-query\//,
    /node_modules\/react-router\//,
    /node_modules\/react-router-dom\//,
    /node_modules\/react-hook-form\//,
    /node_modules\/clsx\//,
  ],
};

export default defineConfig({
  base: '/demo-products-table-vite/',
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          for (const [chunkName, patterns] of Object.entries(chunkGroups)) {
            if (patterns.some((p) => p.test(id))) return chunkName;
          }
          return 'vendor';
        },
      },
    },
  },
});
