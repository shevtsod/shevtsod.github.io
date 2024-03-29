import classNames from 'classnames';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'success' | 'info' | null;

export type ButtonProps<T extends ElementType> = {
  as?: T;
  active?: boolean;
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<T>;

export default function Button<T extends ElementType>({
  as,
  active,
  className,
  children,
  variant,
  ...props
}: ButtonProps<T>) {
  const Component = as ?? 'button';

  return (
    <Component
      {...props}
      className={classNames(
        'inline-flex items-center px-0.5 border-4',
        { active },
        styles.button,
        variant && styles[variant],
        className,
      )}
    >
      {children}
    </Component>
  );
}
