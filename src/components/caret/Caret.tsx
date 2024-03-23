import classNames from 'classnames';
import styles from './Caret.module.css';

export interface CaretProps extends React.HTMLAttributes<HTMLSpanElement> {}

export default function Caret({ className, ...props }: CaretProps) {
  return (
    <span
      {...props}
      className={classNames('w-[0.7em]', styles.caret, className)}
    >
      &#x2588;
    </span>
  );
}
