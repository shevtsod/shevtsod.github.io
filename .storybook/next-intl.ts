import en from '../messages/en.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messagesByLocale: Record<string, any> = { en };

// https://github.com/stevensacks/storybook-next-intl
const nextIntl = {
  defaultLocale: 'en',
  messagesByLocale,
};

export default nextIntl;
