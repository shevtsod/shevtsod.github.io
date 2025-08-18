import Layout from '@/components/layout';

export interface BlogLayoutProps {
  children: React.ReactNode;
}

/**
 * Uses the full app layout
 */
export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <Layout showProgress className="relative">
      {/* Grain overlay */}
      <div className="z-1 top-0 absolute w-full h-full bg-[url('/images/ui/grain.svg')] bg-repeat bg-size-[1024px] brightness-1200 dark:brightness-0 pointer-events-none" />

      {/* Colour overlay */}
      <div className="absolute top-0 w-full h-full bg-gradient-to-b from-10% to-90% from-transparent to-theme-blue-200/25 dark:to-theme-blue-600/60 pointer-events-none" />

      <div className="z-2">{children}</div>
    </Layout>
  );
}
