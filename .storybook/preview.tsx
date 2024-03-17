import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
};

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

export default preview;
