import classNames from 'classnames';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import Logo from '../../logo/Logo';

// Scrolled pixels when Header is shown
const SCROLL_THRESHOLD = 50;

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  showOnScroll?: boolean;
}

export default function Header({
  showOnScroll,
  className,
  ...props
}: HeaderProps) {
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
    <header
      {...props}
      className={classNames(
        { invisible: !shown },
        'h-20 w-full flex py-2 fixed top-0 backdrop-blur-md md:backdrop-blur-lg shadow-lg z-10',
        className,
      )}
    >
      <div className="container mx-auto">
        <Logo shown={shown} animated className="h-full w-auto p-2" />
      </div>
    </header>
  );
}
