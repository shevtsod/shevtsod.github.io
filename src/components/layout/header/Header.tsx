import classNames from 'classnames';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router';
import Button from '../../button/Button';
import Logo from '../../logo/Logo';
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
  const { t } = useTranslation('app', { keyPrefix: 'components.Header' });
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
          <Button as={NavLink} to="/">
            <b>{t('links.home')}</b>
          </Button>
          <Button as={Link} to="/#contact">
            <b>{t('links.contact')}</b>
          </Button>
        </div>
      </div>
    </header>
  );
}
