import classNames from 'classnames';
import styles from './caret.module.css';

export interface CaretProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Renders a terminal caret.
 */
export default function Caret({ className, ...props }: CaretProps) {
  return (
    <span {...props} className={classNames(styles.caret, className)}>
      &#9608;
    </span>
  );
}
