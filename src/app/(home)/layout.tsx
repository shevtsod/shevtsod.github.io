'use client';

import Layout from '@/components/layout';
import { useEffect, useState } from 'react';
import Boot from '../../components/boot';

export interface HomeLayoutProps {
  children: React.ReactNode;
}

/**
 * A custom layout for the home page that displays a boot animation before
 * the main content unless a hash (e.g., "#top") is appended to the URL.
 */
export default function HomeLayout({ children }: HomeLayoutProps) {
  const [booted, setBooted] = useState(true);

  // Show the boot animation unless there is a URL hash
  useEffect(() => {
    if (!window.location.hash) {
      setBooted(false);
    }
  }, []);

  // Show boot animation
  if (!booted) {
    return <Boot onComplete={() => setBooted(true)} />;
  }

  return <Layout showHeaderOnScroll={true}>{children}</Layout>;
}
