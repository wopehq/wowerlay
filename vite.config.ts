import DTS from 'vite-plugin-dts';
import VueJSX from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import path from 'path';

const root = process.cwd();
const mode = process.env.MODE as 'production' | undefined;

export default defineConfig({
   plugins: [
      VueJSX(),
      DTS({
         outputDir: 'dist',
         staticImport: true
      })
   ],
   root: mode !== 'production' ? path.join(root, 'test') : root,
   build: {
      target: 'es2020',
      lib: {
         entry: path.resolve(root, 'src', 'lib.tsx'),
         name: 'vue3-overlay',
         formats: ['es', 'umd']
      },
      rollupOptions: {
         external: ['vue']
      }
   }
});
