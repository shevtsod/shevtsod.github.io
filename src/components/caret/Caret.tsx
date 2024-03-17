import styles from './Caret.module.css';

export function Caret() {
  return <span className={`${styles.caret} w-[0.7em]`}>&#x2588;</span>;
}
