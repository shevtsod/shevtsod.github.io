import classNames from 'classnames';
import {
  HTMLMotionProps,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Button from '../../button/Button';
import Logo from '../../logo/Logo';
import styles from './Header.module.css';

// Scrolled pixels when Header is shown
const SCROLL_THRESHOLD = 50;

export interface HeaderProps extends HTMLMotionProps<'header'> {
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
  const [shown, setShown] = useState(!showOnScroll);

  useEffect(() => {
    if (showOnScroll) {
      setShown(scrollY.get() > SCROLL_THRESHOLD);
    }
  }, [showOnScroll]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (showOnScroll) {
      setShown(latest > SCROLL_THRESHOLD);
    }
  });

  return (
    <motion.header
      {...props}
      className={classNames(
        {
          'backdrop-blur-md md:backdrop-blur-lg ': shown,
          'pointer-events-none': !shown,
          fixed: showOnScroll,
          sticky: !showOnScroll,
        },
        'h-20 w-full flex py-2 fixed top-0 shadow-lg z-10',
        styles.header,
        className,
      )}
    >
      <div
        className={classNames(
          { invisible: !shown },
          'container mx-auto flex justify-between items-center',
        )}
      >
        <Logo shown={shown} animated className="h-full w-auto p-2" />
        <div className="flex gap-1">
          <Button as={NavLink} to="/">
            <b>{t('links.home')}</b>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
