import Layout from '@/components/Layout/Layout';
import AppErrorRoute from '@/features/appError/routes/AppErrorRoute';
import BlogPostRoute from '@/features/blog/routes/BlogPostRoute';
import BlogRoute from '@/features/blog/routes/BlogRoute';
import IndexRoute from '@/features/home/routes/IndexRoute';
import { createHashRouter, Outlet, ScrollRestoration } from 'react-router';

/**
 * Root route (layout) that all other routes are rendered inside of.
 */
export function RootRoute() {
  return (
    <Layout>
      <Outlet />
      <ScrollRestoration />
    </Layout>
  );
}

// https://reactrouter.com/start/data/routing
export const router = createHashRouter([
  {
    path: '/',
    Component: RootRoute,
    ErrorBoundary: AppErrorRoute,
    children: [
      {
        index: true,
        Component: IndexRoute,
      },
      {
        path: '/blog',
        children: [
          { index: true, Component: BlogRoute },
          { path: ':path', Component: BlogPostRoute },
        ],
      },
    ],
  },
]);
