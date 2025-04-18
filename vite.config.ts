import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // 250418 - inlined assets not built correctly?
    assetsInlineLimit: 0,
  },
  plugins: [{ enforce: 'pre', ...mdx() }, react(), svgr()],
});
