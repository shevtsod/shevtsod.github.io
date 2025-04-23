import { Outlet, ScrollRestoration } from 'react-router';
import Layout from '../components/layout/layout/Layout';

export default function RootRoute() {
  return (
    <Layout>
      <Outlet />
      <ScrollRestoration />
    </Layout>
  );
}
