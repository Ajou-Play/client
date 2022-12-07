// vite.config.ts
import * as path from "path";
import react from "file:///Users/jin-pro/project/aplay-client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/jin-pro/project/aplay-client/node_modules/vite/dist/node/index.js";
import mkcert from "file:///Users/jin-pro/project/aplay-client/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
var __vite_injected_original_dirname = "/Users/jin-pro/project/aplay-client";
var vite_config_default = defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: [
      { find: "@Component", replacement: path.resolve(__vite_injected_original_dirname, "src/Component") },
      { find: "@MSW", replacement: path.resolve(__vite_injected_original_dirname, "src/_msw") },
      { find: "@Hook", replacement: path.resolve(__vite_injected_original_dirname, "src/Hook") },
      { find: "@Page", replacement: path.resolve(__vite_injected_original_dirname, "src/Page") },
      { find: "@Util", replacement: path.resolve(__vite_injected_original_dirname, "src/Util") },
      { find: "@Context", replacement: path.resolve(__vite_injected_original_dirname, "src/Context") },
      { find: "@Socket", replacement: path.resolve(__vite_injected_original_dirname, "src/Socket") }
    ]
  },
  server: {
    port: 3e3,
    https: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamluLXByby9wcm9qZWN0L2FwbGF5LWNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2ppbi1wcm8vcHJvamVjdC9hcGxheS1jbGllbnQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2ppbi1wcm8vcHJvamVjdC9hcGxheS1jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBta2NlcnQoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAgeyBmaW5kOiAnQENvbXBvbmVudCcsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL0NvbXBvbmVudCcpIH0sXG4gICAgICB7IGZpbmQ6ICdATVNXJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvX21zdycpIH0sXG4gICAgICB7IGZpbmQ6ICdASG9vaycsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL0hvb2snKSB9LFxuICAgICAgeyBmaW5kOiAnQFBhZ2UnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9QYWdlJykgfSxcbiAgICAgIHsgZmluZDogJ0BVdGlsJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvVXRpbCcpIH0sXG4gICAgICB7IGZpbmQ6ICdAQ29udGV4dCcsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL0NvbnRleHQnKSB9LFxuICAgICAgeyBmaW5kOiAnQFNvY2tldCcsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL1NvY2tldCcpIH0sXG4gICAgXSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBodHRwczogdHJ1ZSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixZQUFZLFVBQVU7QUFFalQsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sWUFBWTtBQUpuQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEVBQUUsTUFBTSxjQUFjLGFBQWtCLGFBQVEsa0NBQVcsZUFBZSxFQUFFO0FBQUEsTUFDNUUsRUFBRSxNQUFNLFFBQVEsYUFBa0IsYUFBUSxrQ0FBVyxVQUFVLEVBQUU7QUFBQSxNQUNqRSxFQUFFLE1BQU0sU0FBUyxhQUFrQixhQUFRLGtDQUFXLFVBQVUsRUFBRTtBQUFBLE1BQ2xFLEVBQUUsTUFBTSxTQUFTLGFBQWtCLGFBQVEsa0NBQVcsVUFBVSxFQUFFO0FBQUEsTUFDbEUsRUFBRSxNQUFNLFNBQVMsYUFBa0IsYUFBUSxrQ0FBVyxVQUFVLEVBQUU7QUFBQSxNQUNsRSxFQUFFLE1BQU0sWUFBWSxhQUFrQixhQUFRLGtDQUFXLGFBQWEsRUFBRTtBQUFBLE1BQ3hFLEVBQUUsTUFBTSxXQUFXLGFBQWtCLGFBQVEsa0NBQVcsWUFBWSxFQUFFO0FBQUEsSUFDeEU7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
