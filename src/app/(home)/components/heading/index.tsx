import classNames from 'classnames';
import Link from 'next/link';
import { type ComponentPropsWithoutRef, type ElementType } from 'react';
import styles from './heading.module.css';

export type HeadingProps<T extends ElementType> = {
  as?: T;
  href?: string;
} & ComponentPropsWithoutRef<T>;

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
  const Component = as ?? 'h1';

  const content = (
    <span className="inline-flex items-center text-center py-2 bg-theme-red-400">
      {children}
    </span>
  );

  const Dither = ({ className }: { className?: string }) => (
    <div
      className={classNames(
        "h-auto min-w-[60px] image-pixelated bg-repeat-y bg-[length:64px_64px] bg-[url('/images/ui/dither-x-red-400.svg')]",
        styles.dither,
        className,
      )}
    />
  );

  return (
    <Component
      {...props}
      className={classNames(
        'pt-4 flex flex-row items-stretch justify-center font-pixel text-xl md:text-4xl text-theme-gray-100 dark:text-black',
        styles.heading,
        className,
      )}
    >
      <Dither />
      {href ? <Link href={href}>{content}</Link> : content}
      <Dither className="rotate-180" />
    </Component>
  );
}
