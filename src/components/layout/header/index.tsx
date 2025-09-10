'use client';

import Button, { type ButtonProps } from '@/components/button';
import Icon from '@/components/icon';
import Logo from '@/components/logo';
import ScrambledText from '@/components/scrambled-text';
import classNames from 'classnames';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, useEffect, useState } from 'react';

// Scrolled pixels when Header is shown
const SCROLL_THRESHOLD = 50;

export interface HeaderProps extends ComponentProps<'header'> {
  showOnScroll?: boolean;
  showProgress?: boolean;
  animatedLogo?: boolean;
}

const ThemeSwitch = dynamic(() => import('../theme-switch'), {
  ssr: false,
  loading: () => <div className="w-6 md:w-8" />,
});

/**
 * App header/navigation bar.
 */
export default function Header({
  showOnScroll = false,
  showProgress = false,
  animatedLogo = true,
  className,
  ...props
}: HeaderProps) {
  const t = useTranslations('components.layout.header');
  const { scrollY, scrollYProgress } = useScroll();
  const [shown, setShown] = useState(!showOnScroll);
  const pathname = usePathname();
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Reset scroll progress when pathname changes
  useEffect(() => {
    scrollYProgress.set(0);
  }, [pathname, scrollYProgress]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Show or hide the header based on the scroll position passing a threshold
    if (showOnScroll) {
      setShown(latest > SCROLL_THRESHOLD);
    }
  });

  const links: ButtonProps<typeof Link>[] = [
    {
      as: Link,
      children: t('links.home'),
      href: { pathname: '/', hash: 'top' },
    },
    {
      as: Link,
      children: t('links.blog'),
      href: { pathname: '/blog' },
    },
    {
      as: Link,
      children: t('links.contact'),
      href: { pathname: '/', hash: 'contact' },
    },
  ];

  return (
    <header
      {...props}
      className={classNames(
        'h-14 md:h-18 w-full flex flex-col fixed top-0 shadow-lg z-50 bg-black/10 backdrop-blur-md md:backdrop-blur-lg transition-all duration-0 ease-[steps(4,end)]',
        { 'bg-transparent pointer-events-none opacity-0': !shown },
        { 'duration-400': shown },
        { fixed: showOnScroll, sticky: !showOnScroll },
        className,
      )}
    >
      <div className="flex-1 container mx-auto px-4 flex justify-between items-center">
        <Link
          href={{ pathname: '/', hash: '#top' }}
          className="h-full w-auto p-2 shrink-0"
          aria-label="Logo"
        >
          <Logo intro={showOnScroll} shown={shown} animated={animatedLogo} />
        </Link>

        <nav className="h-full flex gap-1 items-center text-xs md:text-base text-theme-red-400">
          {links.map(({ children, ...props }, i) => (
            <Button
              key={i}
              {...props}
              active={
                typeof props.href === 'object' &&
                props.href.pathname === pathname &&
                (!props.href.hash || props.href.hash === 'top')
              }
            >
              <b>
                <ScrambledText>{children as string}</ScrambledText>
              </b>
            </Button>
          ))}

          {/* GitHub link */}
          <Link
            href="https://github.com/shevtsod"
            target="_blank"
            className="h-6 md:h-8"
          >
            <Icon icon="Github" className="h-full w-auto" />
          </Link>

          <ThemeSwitch className="h-6! md:h-8!" />
        </nav>
      </div>

      {showProgress && (
        <motion.div
          initial={{ width: 0 }}
          style={{ width: progress }}
          className="h-1 bg-theme-red-400"
        ></motion.div>
      )}
    </header>
  );
}
