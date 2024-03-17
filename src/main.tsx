import '@fontsource-variable/labrada';
import '@fontsource-variable/nunito';
import '@fontsource/nothing-you-could-do';
import '@fontsource/syne-mono';
import '@fontsource/vt323';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import i18n from './i18n';
import IndexRoute from './routes';
import ErrorRoute from './routes/error';
import RootRoute from './routes/root';

const router = createBrowserRouter([
  {
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: '/',
        element: <IndexRoute />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      {/* https://reactrouter.com/en/main/start/tutorial */}
      <RouterProvider router={router} />
    </I18nextProvider>
  </React.StrictMode>
);
