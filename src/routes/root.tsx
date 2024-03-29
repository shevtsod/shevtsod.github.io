import { useState } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Layout from '../components/layout/layout/Layout';
import useBoot from '../hooks/useBoot';

export interface ContextType {
  setShowHeaderOnScroll: (value: boolean) => void;
}

export default function RootRoute() {
  const { pathname } = useLocation();
  const [showHeaderOnScroll, setShowHeaderOnScroll] = useState(false);

  if (['/'].includes(pathname)) {
    const boot = useBoot();

    if (boot) {
      return boot;
    }
  }

  const context: ContextType = {
    setShowHeaderOnScroll,
  };

  return (
    <Layout showHeaderOnScroll={showHeaderOnScroll}>
      <Outlet context={context} />
      <ScrollRestoration />
    </Layout>
  );
}
