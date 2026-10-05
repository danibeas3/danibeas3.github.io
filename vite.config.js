import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        portfolio: fileURLToPath(new URL('./index.html', import.meta.url)),
        portaldoc: fileURLToPath(new URL('./portaldoc/index.html', import.meta.url)),
        portalemp: fileURLToPath(new URL('./portalemp/index.html', import.meta.url)),
      },
    },
  },
});
