import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['path', 'fs', 'buffer', 'process'],
      globals: {
        Buffer: true,
        global: true,
        process: true
      },
      overrides: {
        fs: {
          readFileSync: () => '',
          existsSync: () => false,
          statSync: () => ({ isDirectory: () => false }),
          realpathSync: (x: string) => x
        }
      }
    })
  ],
  resolve: {
    alias: {
      path: 'path-browserify',
      fs: 'memfs'
    }
  },
  optimizeDeps: {
    include: ['tau-prolog'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  define: {
    'process.env': {},
    global: 'globalThis'
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});