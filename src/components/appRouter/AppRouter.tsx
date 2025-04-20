import { RouterProvider, createHashRouter } from 'react-router';
import IndexRoute from '../../routes';
import BlogRoute from '../../routes/blog';
import ErrorRoute from '../../routes/error';
import RootRoute from '../../routes/root';

// https://reactrouter.com/start/data/routing
const router = createHashRouter([
  {
    path: '/',
    Component: RootRoute,
    ErrorBoundary: ErrorRoute,
    children: [
      {
        index: true,
        Component: IndexRoute,
      },
      {
        path: '/blog',
        Component: BlogRoute,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
