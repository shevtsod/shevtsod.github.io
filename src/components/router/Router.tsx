import React, { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorRoute from '../../routes/error';
import RootRoute from '../../routes/root';
import Boot from '../boot/Boot';

const BOOT_DELAY = 2;

const LazyIndexRoute = React.lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, BOOT_DELAY * 1000));
  return import('../../routes');
});

const router = createBrowserRouter([
  {
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Boot />}>
            <LazyIndexRoute />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function Router() {
  // https://reactrouter.com/en/main/start/tutorial
  return <RouterProvider router={router} />;
}
