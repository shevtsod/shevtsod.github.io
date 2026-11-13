import {
  PolymorphicComponent,
  PolymorphicComponentProps,
} from '@/components/polymorphic-component';
import classNames from 'classnames';
import Link from 'next/link';
import { type ElementType } from 'react';
import styles from './heading.module.css';

export type HeadingProps<T extends ElementType> = {
  href?: string;
} & PolymorphicComponentProps<T>;

/**
 * Renders the decorative dither stripes shown on both sides of a heading.
 */
function Dither({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        "h-auto min-w-[60px] image-pixelated bg-repeat-y bg-[length:64px_64px] bg-[url('/images/ui/dither-x-red-400.svg')]",
        styles.dither,
        className,
      )}
    />
  );
}

/**
 * Renders a section heading.
 */
export default function Heading<T extends ElementType>({
  as,
  className,
  children,
  href,
  ...props
}: HeadingProps<T>) {
  const content = (
    <span className="inline-flex items-center text-center py-2 bg-theme-red-400">
      {children}
    </span>
  );

  return (
    <PolymorphicComponent
      {...props}
      as={as}
      className={classNames(
        'pt-4 flex flex-row items-stretch justify-center font-pixel text-xl md:text-4xl text-white dark:text-black',
        styles.heading,
        className,
      )}
    >
      <Dither />
      {href ? <Link href={href}>{content}</Link> : content}
      <Dither className="rotate-180" />
    </PolymorphicComponent>
  );
}
