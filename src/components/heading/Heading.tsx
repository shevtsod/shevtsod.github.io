import classNames from 'classnames';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import { Link } from 'react-router';
import miniDitherXRed400Image from '../../assets/images/mini-dither-x-red-400.svg';
import styles from './Heading.module.css';

export type HeadingProps<T extends ElementType> = {
  as?: T;
  href?: string;
} & ComponentPropsWithoutRef<T>;

export default function Heading<T extends ElementType>({
  as,
  className,
  children,
  href,
  ...props
}: HeadingProps<T>) {
  const Component = as ?? 'h1';

  const content = (
    <span className="inline-flex items-center text-center px-4 py-2 bg-theme-red-400">
      {children}
    </span>
  );

  const Dither = ({ className }: { className?: string }) => (
    <div
      style={{
        backgroundImage: `url("${miniDitherXRed400Image}")`,
      }}
      className={classNames(
        'h-auto min-w-[48px] image-pixelated bg-repeat-y bg-[length:64px_64px]',
        styles.dither,
        className
      )}
    />
  );

  return (
    <Component
      {...props}
      className={classNames(
        'py-6 flex flex-row items-stretch justify-center font-pixel text-xl md:text-4xl text-theme-gray-100 dark:text-theme-gray-800',
        styles.heading,
        className
      )}
    >
      <Dither />
      {href ? <Link to={href}>{content}</Link> : content}
      <Dither className="rotate-180" />
    </Component>
  );
}
