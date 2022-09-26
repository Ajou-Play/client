import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@Component', replacement: path.resolve(__dirname, 'src/Component') },
      { find: '@MSW', replacement: path.resolve(__dirname, 'src/_msw') },
      { find: '@Hook', replacement: path.resolve(__dirname, 'src/Hook') },
      { find: '@Page', replacement: path.resolve(__dirname, 'src/Page') },
    ],
  },
  server: {
    port: 3000,
  },
});
