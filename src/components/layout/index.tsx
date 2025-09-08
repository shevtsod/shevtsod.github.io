'use client';

import Icon from '@/components/icon';
import { useTheme } from '@/components/theme';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ComponentProps, useEffect, useState } from 'react';
import Fab from './fab';
import Footer from './footer';
import Header from './header';

export interface LayoutProps extends ComponentProps<'div'> {
  children?: React.ReactNode;
  header?: boolean;
  footer?: boolean;
  fab?: boolean;
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
  header = true,
  footer = true,
  fab = true,
  showHeaderOnScroll,
  showProgress,
  animatedLogo,
  mainClassName,
  className,
  ...props
}: LayoutProps) {
  const t = useTranslations('components.layout');
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      {...props}
      className={classNames(
        'min-h-[100svh] flex flex-col bg-white dark:bg-black text-black dark:text-white font-mono transition-colors ease-[steps(4,end)] duration-400',
        className,
      )}
    >
      {/* github.com/PrismJS/prism-themes */}
      {mounted && theme === 'dark' && (
        <link rel="stylesheet" href={`/styles/prism/prism-one-dark.css`} />
      )}

      {header && (
        <Header
          showOnScroll={showHeaderOnScroll}
          showProgress={showProgress}
          animatedLogo={animatedLogo}
        />
      )}

      <main className={classNames('flex flex-col flex-1', mainClassName)}>
        {children}
      </main>

      {footer && <Footer />}

      {fab && (
        <Fab
          as={Link}
          href="#top"
          showOnScroll
          className="m-8"
          title={t('returnToTop')}
        >
          <Icon
            icon="ChevronDown"
            className="h-[32px] w-auto rotate-180"
            viewBox="0 0 16 16"
          />
        </Fab>
      )}
    </div>
  );
}
