import { getRequestConfig } from 'next-intl/server';

// https://next-intl.dev/docs/getting-started/app-router/without-i18n-routing
export default getRequestConfig(async () => {
  const locale = 'en';
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return { locale, messages };
});
