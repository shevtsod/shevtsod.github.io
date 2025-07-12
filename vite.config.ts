import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const storybook = process.argv.some((arg) => arg.includes('storybook'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    !storybook && {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
        ],
      }),
    },
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
