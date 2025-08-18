'use client';

import Icon from '@/components/icon';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Fab from './fab';
import Footer from './footer';
import Header from './header';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  showHeaderOnScroll?: boolean;
  showProgress?: boolean;
  animatedLogo?: boolean;
  mainClassName?: string;
}

/**
 * Basic app layout with a header and footer.
 */
export default function Layout({
  children,
  showHeaderOnScroll,
  showProgress,
  animatedLogo,
  mainClassName,
  className,
  ...props
}: LayoutProps) {
  const t = useTranslations('components.layout');

  return (
    <div
      {...props}
      className={classNames('min-h-[100svh] flex flex-col', className)}
    >
      <Header
        showOnScroll={showHeaderOnScroll}
        showProgress={showProgress}
        animatedLogo={animatedLogo}
      />
      <main className={classNames('flex flex-col flex-1', mainClassName)}>
        {children}
      </main>
      <Footer />
      <Fab
        as={Link}
        href="#top"
        showOnScroll
        className="m-8"
        title={t('returnToTop')}
      >
        <Icon
          icon="16x/arrow-down"
          className="h-[32px] w-auto rotate-180"
          viewBox="0 0 16 16"
        />
      </Fab>
    </div>
  );
}
