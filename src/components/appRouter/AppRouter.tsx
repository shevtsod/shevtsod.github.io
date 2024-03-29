import { RouterProvider, createHashRouter } from 'react-router-dom';
import IndexRoute from '../../routes';
import ErrorRoute from '../../routes/error';
import RootRoute from '../../routes/root';

// https://reactrouter.com/en/main/start/tutorial
const router = createHashRouter([
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

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
