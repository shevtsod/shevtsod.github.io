import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/nextjs';
import classNames from 'classnames';
import '../src/app/globals.css';
import { rootClassName } from '../src/app/root';
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
    nextjs: {
      // https://storybook.js.org/docs/get-started/frameworks/nextjs#set-nextjsappdirectory-to-true
      appDirectory: true,
    },
  },
  decorators: [
    // Wrap stories with global styling
    (Story) => (
      <div
        className={classNames(
          rootClassName,
          'bg-white dark:bg-black text-black dark:text-theme-gray-100 font-mono',
        )}
      >
        <Story />
      </div>
    ),
    // https://storybook.js.org/docs/essentials/themes
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'dark',
    }),
  ],
};

export default preview;
