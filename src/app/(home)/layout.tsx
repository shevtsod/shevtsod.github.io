'use client';

import Boot from '@/components/boot';
import Layout from '@/components/layout';
import { useIntro } from '@/hooks/use-intro';

export interface HomeLayoutProps {
  children: React.ReactNode;
}

/**
 * A custom layout for the home page that displays a boot animation before
 * the main content unless a hash (e.g., "#top") is appended to the URL.
 */
export default function HomeLayout({ children }: HomeLayoutProps) {
  const [intro, setIntro] = useIntro();

  return (
    <Layout
      showHeaderOnScroll={true}
      header={intro === false}
      footer={intro === false}
      fab={intro === false}
    >
      {intro === false && children}
      {intro && <Boot onComplete={() => setIntro(false)} />}
    </Layout>
  );
}
