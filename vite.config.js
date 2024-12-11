import vue from '@vitejs/plugin-vue';
import {defineConfig} from 'vite';
import {createIIFEWrapper} from './src/helpers/widget-wrapper';

function wrapIIFE() {
  return {
    name: 'wrap-iife',
    generateBundle(options, bundle) {
      const fileName = 'nous-chat.js';
      const file = bundle[fileName];
      if (file) {
        file.code = createIIFEWrapper(file.code);
      }
    },
  };
}

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'Nous',
      fileName: () => 'nous-chat.js',
      formats: ['iife'],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    cssCodeSplit: false,
  },
  plugins: [vue(), wrapIIFE()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    // open: './index.html',
  },
});