'use client';

import classNames from 'classnames';
import Footer from './footer';
import Header from './header';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  showHeaderOnScroll?: boolean;
}

/**
 * Basic app layout with a header and footer.
 */
export default function Layout({
  children,
  showHeaderOnScroll = false,
  className,
  ...props
}: LayoutProps) {
  return (
    <div
      {...props}
      className={classNames('min-h-[100svh] flex flex-col', className)}
    >
      <Header showOnScroll={showHeaderOnScroll} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
