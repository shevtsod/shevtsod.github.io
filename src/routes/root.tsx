import React, { Suspense, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Boot from '../components/boot/Boot';
import Layout from '../components/layout/Layout';

const BOOT_DELAY = 2;
const BOOT_PATHNAMES = ['/'];

export default function RootRoute() {
  const { pathname } = useLocation();
  const delay = BOOT_PATHNAMES.includes(pathname) ? BOOT_DELAY : 0;
  const fallback = BOOT_PATHNAMES.includes(pathname) && <Boot />;

  // Delay router outlet to show boot screen on selected routes
  const LazyOutlet = useMemo(
    () =>
      React.lazy(async () => {
        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        return import('../components/appOutlet/AppOutlet');
      }),
    [delay],
  );

  return (
    <Suspense fallback={fallback}>
      <Layout>
        <LazyOutlet />
      </Layout>
    </Suspense>
  );
}
