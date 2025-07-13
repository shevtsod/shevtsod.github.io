import i18n from '@/lib/i18next';
import '@fontsource-variable/labrada';
import '@fontsource-variable/ysabeau-office';
import '@fontsource/nothing-you-could-do';
import '@fontsource/syne-mono';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider } from 'react-router';
import './App.css';
import { router } from './router';

export interface AppProps {
  children?: React.ReactNode;
}

export default function App({
  // Default to the router, but allow app to specify children instead (e.g. for tests)
  children = <RouterProvider router={router} />,
}: AppProps) {
  // Append classes to HTML element
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

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
