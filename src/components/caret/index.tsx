import classNames from 'classnames';
import styles from './caret.module.css';

export interface CaretProps extends React.HTMLAttributes<HTMLSpanElement> {}

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
