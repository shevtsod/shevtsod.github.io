import '@fontsource-variable/labrada';
import '@fontsource-variable/ysabeau-office';
import '@fontsource/nothing-you-could-do';
import '@fontsource/syne-mono';
import '@fontsource/vt323';
import './App.css';

import React from 'react';
import { Helmet } from 'react-helmet';
import { I18nextProvider } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import i18n from '../../i18n';
import Router from '../router/Router';

export default function App() {
  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <Helmet>
          <html lang="en" className="bg-black text-white" />
          <title>{useTitle()}</title>
        </Helmet>
        <Router />
      </I18nextProvider>
    </React.StrictMode>
  );
}
