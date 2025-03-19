import { useEffect, useState } from 'react';
import { Outlet, ScrollRestoration, useNavigation } from 'react-router';
import Layout from '../components/layout/layout/Layout';
import useBoot from '../hooks/useBoot';

export interface ContextType {
  setShowHeaderOnScroll: (value: boolean) => void;
  setShowBoot: (value: boolean) => void;
}

export default function RootRoute() {
  const { state } = useNavigation();
  const [showHeaderOnScroll, setShowHeaderOnScroll] = useState(false);
  const [showBoot, setShowBoot] = useState(false);
  const boot = useBoot();

  // Reset layout props when navigating between pages
  useEffect(() => {
    if (state === 'loading') {
      setShowHeaderOnScroll(false);
      setShowBoot(false);
    }
  }, [state]);

  // Render boot instead of layout if enabled
  if (showBoot && boot) {
    return boot;
  }

  // Render layout
  return (
    <Layout showHeaderOnScroll={showHeaderOnScroll}>
      <Outlet
        context={
          {
            setShowHeaderOnScroll,
            setShowBoot,
          } satisfies ContextType
        }
      />
      <ScrollRestoration />
    </Layout>
  );
}
