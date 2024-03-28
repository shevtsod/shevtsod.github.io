import classNames from 'classnames';
import {
  ComponentPropsWithoutRef,
  ElementType,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Button.module.css';

export type ButtonProps<T extends ElementType> = {
  as?: T;
  active?: boolean;
} & ComponentPropsWithoutRef<T>;

export default function Button<T extends ElementType>({
  as,
  active,
  className,
  children,
  ...props
}: ButtonProps<T>) {
  const Component = as ?? 'button';
  const ref = useRef<HTMLButtonElement>(null);
  const [init, setInit] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;

    if (init) {
      if (ref.current) {
        const el = ref.current;
        el.classList.remove(styles.hover, styles.unhover);

        timeout = setTimeout(() => {
          el.classList.add(hover ? styles.hover : styles.unhover);
        }, 10);
      }
    } else {
      setInit(true);
    }

    return () => clearTimeout(timeout);
  }, [ref, hover]);

  return (
    <Component
      {...props}
      ref={ref}
      className={classNames(
        'inline-flex items-center px-0.5 border-4',
        { active },
        styles.button,
        className,
      )}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {children}
    </Component>
  );
}
