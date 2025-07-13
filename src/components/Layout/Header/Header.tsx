import Button, { type ButtonProps } from '@/components/Button/Button';
import Logo from '@/components/Logo/Logo';
import ScrambledText from '@/components/ScrambledText/ScrambledText';
import classNames from 'classnames';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router';
import styles from './Header.module.css';

// Scrolled pixels when Header is shown
const SCROLL_THRESHOLD = 50;

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  showOnScroll?: boolean;
  className?: string;
}

export default function Header({
  showOnScroll,
  className,
  ...props
}: HeaderProps) {
  const { t } = useTranslation('app', {
    keyPrefix: 'components.Layout.Header',
  });
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(!showOnScroll || scrollY.get() > SCROLL_THRESHOLD);
  }, [scrollY, showOnScroll]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (showOnScroll) {
      setShown(latest > SCROLL_THRESHOLD);
    }
  });

  const links: ButtonProps<typeof NavLink | typeof Link>[] = [
    { as: NavLink, children: t('links.home'), to: '/', end: true },
    { as: NavLink, children: t('links.blog'), to: '/blog', end: true },
    { as: Link, children: t('links.contact'), to: '/#contact' },
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
        className
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavLink to="/" className="h-full aspect-square p-2">
          <Logo shown={shown} animated className="h-full aspect-square" />
        </NavLink>
        <div className="flex gap-1">
          {links.map(({ children, ...props }, i) => (
            <Button key={i} {...props}>
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
