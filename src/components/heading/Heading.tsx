import classNames from 'classnames';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import HashIcon from '../../assets/images/icons/hash.svg?react';

export type HeadingProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export default function Heading<T extends ElementType>({
  as,
  className,
  children,
  ...props
}: HeadingProps<T>) {
  const Component = as || 'h1';

  return (
    <Component
      {...props}
      className={classNames(
        'w-fit mx-auto text-xl md:text-4xl text-center font-bold text-theme-gray-800',
        className,
      )}
    >
      <span className="inline-flex items-center p-2 gap-2 bg-theme-red-400">
        <span>
          <HashIcon className="h-5 md:h-9 w-auto" viewBox="0 0 16 16" />
        </span>
        <span>{children}</span>
      </span>
    </Component>
  );
}
