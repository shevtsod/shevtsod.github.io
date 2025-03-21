import classNames from 'classnames';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import Icon from '../icon/Icon';

export type HeadingProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export default function Heading<T extends ElementType>({
  as,
  className,
  children,
  ...props
}: HeadingProps<T>) {
  const Component = as ?? 'h1';

  return (
    <Component
      {...props}
      className={classNames(
        'text-xl md:text-4xl font-bold text-theme-gray-100 dark:text-theme-gray-800',
        className
      )}
    >
      <span className="inline-flex items-center p-2 gap-2 bg-theme-red-400">
        <Icon
          icon="hash"
          className="shrink-0 h-4 md:h-8 w-auto"
          viewBox="0 0 16 16"
        />
        <span>{children}</span>
      </span>
    </Component>
  );
}
