import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// https://react.i18next.com/getting-started
i18n
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    debug: process.env.NODE_ENV === 'development',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: 'app',
    fallbackLng: 'en',
  });

export default i18n;
