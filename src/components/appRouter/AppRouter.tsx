import { RouterProvider, createHashRouter } from 'react-router-dom';
import IndexRoute from '../../routes';
import ErrorRoute from '../../routes/error';
import RootRoute from '../../routes/root';

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

export default function Router() {
  // https://reactrouter.com/en/main/start/tutorial
  return <RouterProvider router={router} />;
}
