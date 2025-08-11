import Layout from '@/components/layout';

export interface BlogLayoutProps {
  children: React.ReactNode;
}

/**
 * Uses the full app layout
 */
export default function BlogLayout({ children }: BlogLayoutProps) {
  return <Layout>{children}</Layout>;
}
