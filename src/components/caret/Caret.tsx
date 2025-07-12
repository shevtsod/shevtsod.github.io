import classNames from 'classnames';
import styles from './Caret.module.css';

export interface CaretProps extends React.HTMLAttributes<HTMLSpanElement> {}

export default function Caret({ className, ...props }: CaretProps) {
  return (
    <span {...props} className={classNames(styles.caret, className)}>
      &#9608;
    </span>
  );
}
