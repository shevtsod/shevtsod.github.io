import '@fontsource-variable/labrada';
import '@fontsource-variable/ysabeau-office';
import '@fontsource/nothing-you-could-do';
import '@fontsource/syne-mono';
import './App.css';

import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import i18n from '../../i18n';
import Router from './appRouter/AppRouter';

export interface AppProps {
  children?: React.ReactNode;
}

export default function App({ children = <Router /> }: AppProps) {
  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <Helmet>
            <html lang="en" className="dark" />
            <body className="bg-theme-gray-200 dark:bg-theme-gray-800 text-theme-gray-800 dark:text-theme-gray-100 font-mono" />
            <title>{useTitle()}</title>
          </Helmet>

          {children}
        </HelmetProvider>
      </I18nextProvider>
    </React.StrictMode>
  );
}
