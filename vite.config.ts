import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: [
      { find: '@Component', replacement: path.resolve(__dirname, 'src/Component') },
      { find: '@MSW', replacement: path.resolve(__dirname, 'src/_msw') },
      { find: '@Hook', replacement: path.resolve(__dirname, 'src/Hook') },
      { find: '@Page', replacement: path.resolve(__dirname, 'src/Page') },
      { find: '@Util', replacement: path.resolve(__dirname, 'src/Util') },
      { find: '@Context', replacement: path.resolve(__dirname, 'src/Context') },
    ],
  },
  server: {
    port: 3000,
    https: true,
  },
});
