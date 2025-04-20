import type { StorybookConfig } from '@storybook/react-vite';

// eslint-disable-next-line storybook/story-exports
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    'storybook-addon-remix-react-router',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
