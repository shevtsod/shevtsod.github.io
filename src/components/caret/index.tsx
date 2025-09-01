import classNames from 'classnames';
import { ComponentProps } from 'react';
import styles from './caret.module.css';

export interface CaretProps extends ComponentProps<'span'> {}

/**
 * Renders a terminal caret.
 */
export default function Caret({ className, ...props }: CaretProps) {
  return (
    <span
      {...props}
      className={classNames(
        ' inline-block align-text-bottom bg-black dark:bg-white w-3 h-5 mx-1',
        styles.caret,
        className,
      )}
    />
  );
}
