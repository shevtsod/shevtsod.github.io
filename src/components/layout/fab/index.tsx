'use client';

import {
  PolymorphicComponent,
  PolymorphicComponentProps,
} from '@/components/polymorphic-component';
import classNames from 'classnames';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { ElementType, useState } from 'react';

export type FabProps<T extends ElementType = 'button'> = {
  showOnScroll?: boolean;
} & PolymorphicComponentProps<T>;

// Scrolled pixels when FAB is shown
const SCROLL_THRESHOLD = 50;

/**
 * Renders a floating action button (FAB).
 */
export default function Fab<T extends ElementType = 'button'>({
  as = 'button',
  showOnScroll = false,
  onClick,
  className,
  children,
  ...props
}: FabProps<T>) {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(!showOnScroll);

  // Hide the fab whenever we start scrolling up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (showOnScroll) {
      setShown(
        latest > SCROLL_THRESHOLD && latest - (scrollY?.getPrevious() ?? 0) > 0,
      );
    }
  });

  return (
    <PolymorphicComponent
      as={as}
      onClick={onClick}
      className={classNames(
        'fixed z-50 bottom-0 right-0 p-2 border-2 bg-white dark:bg-black transition-all duration-400 ease-[steps(3,end)]',
        { 'opacity-0 scale-0 pointer-events-none': !shown },
        className,
      )}
      {...props}
    >
      {children}
    </PolymorphicComponent>
  );
}
