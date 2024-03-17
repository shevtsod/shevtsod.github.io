import React, { Suspense, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Boot from '../components/boot/Boot';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

const BOOT_DELAY = 2;
const BOOT_PATHNAMES = ['/'];

export default function RootRoute() {
  const { pathname } = useLocation();
  const delay = BOOT_PATHNAMES.includes(pathname) ? BOOT_DELAY : 0;

  const LazyOutlet = useMemo(
    () =>
      React.lazy(async () => {
        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        return import('../components/appRouter/AppOutlet');
      }),
    [delay],
  );

  return (
    <>
      <Suspense fallback={BOOT_PATHNAMES.includes(pathname) ? <Boot /> : null}>
        <Header />
        <LazyOutlet />
        <Footer />
      </Suspense>
    </>
  );
}
