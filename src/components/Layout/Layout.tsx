import Boot from '@/components/Boot/Boot';
import { Effect } from '@/components/Effect/Effect';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import LayoutContext, {
  defaultLayoutOptions,
  type LayoutOptions,
} from './LayoutContext';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function Layout({ children, className, ...props }: LayoutProps) {
  const { pathname } = useLocation();
  const [layoutOptions, setLayoutOptions] =
    useState<LayoutOptions>(defaultLayoutOptions);
  const { showBoot, showHeaderOnScroll } = layoutOptions;
  const [booted, setBooted] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Reset layout options on location change
  const resetLayout = useCallback(() => {
    if (pathname !== prevPathname) {
      setLayoutOptions(defaultLayoutOptions);
      setPrevPathname(pathname);
    }
  }, [pathname, prevPathname, setPrevPathname]);

  if (showBoot && !booted) {
    return (
      <Boot
        showBoot={showBoot}
        onComplete={() => {
          setLayoutOptions((value) => ({ ...value, showBoot: false }));
          setBooted(true);
        }}
      />
    );
  }

  return (
    <LayoutContext.Provider value={{ layoutOptions, setLayoutOptions }}>
      <Effect effect={resetLayout} />
      <div
        {...props}
        className={classNames('min-h-[100svh] flex flex-col', className)}
      >
        <Header showOnScroll={showHeaderOnScroll} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LayoutContext.Provider>
  );
}
