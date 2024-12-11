import vue from '@vitejs/plugin-vue';
import {defineConfig} from 'vite';
import {createIIFEWrapper} from './src/helpers/widget-wrapper';

function wrapIIFE() {
  return {
    name: 'wrap-iife',
    generateBundle(options, bundle) {
      // Look for the generated file with hash in the bundle
      const bundleFile = Object.keys(bundle)
          .find(filename => filename.startsWith('nous-chat') && filename.endsWith('.js'));
      if (bundleFile && bundle[bundleFile]) {
        bundle[bundleFile].code = createIIFEWrapper(bundle[bundleFile].code);
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
      fileName: (format) => 'nous-chat.[hash].js',
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