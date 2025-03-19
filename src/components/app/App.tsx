import '@fontsource-variable/labrada';
import '@fontsource-variable/ysabeau-office';
import '@fontsource/nothing-you-could-do';
import '@fontsource/syne-mono';
import './App.css';

import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import i18n from '../../i18n';
import Router from '../appRouter/AppRouter';

export interface AppProps {
  children?: React.ReactNode;
}

export default function App({ children = <Router /> }: AppProps) {
  useTitle();

  useEffect(() => {
    const htmlClasses = ['dark'];
    const bodyClasses = [
      'bg-theme-gray-200',
      'dark:bg-theme-gray-800',
      'text-theme-gray-800',
      'dark:text-theme-gray-100',
      'font-mono',
    ];

    document.documentElement.classList.add(...htmlClasses);
    document.body.classList.add(...bodyClasses);

    return () => {
      document.documentElement.classList.remove(...htmlClasses);
      document.body.classList.remove(...bodyClasses);
    };
  }, []);

  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </React.StrictMode>
  );
}
