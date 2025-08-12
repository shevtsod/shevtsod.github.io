'use client';

import Button, { type ButtonProps } from '@/components/button';
import Logo from '@/components/logo';
import ScrambledText from '@/components/scrambled-text';
import classNames from 'classnames';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './header.module.css';

// Scrolled pixels when Header is shown
const SCROLL_THRESHOLD = 50;

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  showOnScroll?: boolean;
  className?: string;
}

/**
 * App header/navigation bar.
 */
export default function Header({
  showOnScroll,
  className,
  ...props
}: HeaderProps) {
  const t = useTranslations('components.layout.header');
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShown(!showOnScroll || scrollY.get() > SCROLL_THRESHOLD);
  }, [scrollY, showOnScroll]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
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
        {
          'invisible pointer-events-none': !shown,
          'backdrop-blur-md md:backdrop-blur-lg': shown,
          fixed: showOnScroll,
          sticky: !showOnScroll,
        },
        'h-20 w-full flex py-2 fixed top-0 shadow-lg z-50',
        styles.header,
        className,
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href={{ pathname: '/', hash: 'top ' }}
          className="h-full aspect-square p-2"
        >
          <Logo shown={shown} animated className="h-full aspect-square" />
        </Link>
        <div className="flex gap-1">
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
        </div>
      </div>
    </header>
  );
}
