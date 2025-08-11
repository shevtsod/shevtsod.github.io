import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/nextjs';
import Global from '../src/app/components/global';
import nextIntl from './next-intl';

const preview: Preview = {
  // https://github.com/stevensacks/storybook-next-intl
  initialGlobals: {
    locale: 'en',
    locales: {
      en: 'English',
    },
  },
  parameters: {
    // https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
    // https://storybook.js.org/addons/storybook-next-intl
    nextIntl,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        includeNames: true,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    // Wrap stories with global styling
    (Story) => (
      <Global>
        <Story />
      </Global>
    ),
    // https://storybook.js.org/docs/essentials/themes
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'dark',
    }),
  ],
};

export default preview;
