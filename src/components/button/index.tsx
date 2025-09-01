import {
  PolymorphicComponent,
  PolymorphicComponentProps,
} from '@/components/polymorphic-component';
import classNames from 'classnames';
import { type ElementType } from 'react';
import styles from './button.module.css';

type ButtonVariant = 'success' | 'info' | 'warn' | null;

export type ButtonProps<T extends ElementType = 'button'> = {
  active?: boolean;
  variant?: ButtonVariant;
} & PolymorphicComponentProps<T>;

/**
 * Custom-styled wrapper for buttons and links.
 */
export default function Button<T extends ElementType = 'button'>({
  as,
  active,
  className,
  children,
  variant,
  ...props
}: ButtonProps<T>) {
  return (
    <PolymorphicComponent
      {...props}
      as={as}
      className={classNames(
        'px-0.5 border-4 no-underline',
        { active },
        styles.button,
        variant && styles[variant],
        className,
      )}
    >
      {children}
    </PolymorphicComponent>
  );
}
