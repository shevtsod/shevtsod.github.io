import type { StorybookConfig } from '@storybook/react-vite';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

// eslint-disable-next-line storybook/story-exports
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-themes',
    'storybook-addon-remix-react-router',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
          },
        },
      },
    },
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
