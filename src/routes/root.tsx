import classNames from 'classnames';
import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import Boot from '../components/boot/Boot';
import Layout from '../components/layout/layout/Layout';
import { useAppStore } from '../hooks/useAppStore';

export default function RootRoute() {
  const location = useLocation();
  const showBoot = useAppStore((state) => state.showBoot);
  const setShowBoot = useAppStore((state) => state.setShowBoot);
  const showHeaderOnScroll = useAppStore((state) => state.showHeaderOnScroll);
  const setShowHeaderOnScroll = useAppStore(
    (state) => state.setShowHeaderOnScroll
  );

  // Reset layout state on navigation
  useEffect(() => {
    setShowHeaderOnScroll(false);
  }, [location, setShowBoot, setShowHeaderOnScroll]);

  // Render layout
  return (
    <>
      <Boot
        className={classNames({ hidden: !showBoot })}
        onComplete={() => setShowBoot(false)}
      />
      <Layout
        className={classNames({ hidden: showBoot })}
        showHeaderOnScroll={showHeaderOnScroll}
      >
        <Outlet />
        <ScrollRestoration />
      </Layout>
    </>
  );
}
