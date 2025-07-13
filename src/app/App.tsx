import '@fontsource-variable/labrada';
import '@fontsource-variable/ysabeau-office';
import '@fontsource/nothing-you-could-do';
import '@fontsource/syne-mono';
import './App.css';

import { useEffect } from 'react';
import Provider from './Provider';

export interface AppProps {
  children?: React.ReactNode;
}

export default function App({ children }: AppProps) {
  // Append classes to HTML element
  useEffect(() => {
    const htmlClasses = [
      'bg-theme-gray-200',
      'dark:bg-theme-gray-800',
      'text-theme-gray-800',
      'dark:text-theme-gray-100',
      'font-mono',
      'dark',
    ];

    document.documentElement.classList.add(...htmlClasses);

    return () => {
      document.documentElement.classList.remove(...htmlClasses);
    };
  }, []);

  return <Provider>{children}</Provider>;
}
