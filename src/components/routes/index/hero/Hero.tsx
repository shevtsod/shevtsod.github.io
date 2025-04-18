import classNames from 'classnames';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ComponentPropsWithoutRef,
  ElementType,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../../icon/Icon';
import Typewriter from '../../../typewriter/Typewriter';
import styles from './Hero.module.css';

export type HeroProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export default function Hero<T extends ElementType>({
  as,
  className,
  ...props
}: HeroProps<T>) {
  const Component = as ?? 'div';
  const { t } = useTranslation('app', { keyPrefix: 'components.Hero' });
  const [subtitlePaused, setSubtitlePaused] = useState(true);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    const timeout = setTimeout(() => setSubtitlePaused(false), 3500);
    return () => clearTimeout(timeout);
  }, []);

  const chevronOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.19, 0.2, 0.39, 0.4],
    [1, 1, 0.5, 0.5, 0]
  );

  return (
    <Component
      {...props}
      ref={scrollRef}
      className={classNames(
        'container mx-auto relative flex flex-col justify-center text-center overflow-hidden',
        className
      )}
    >
      <h1
        className={classNames(
          'mb-16 text-[5em] sm:text-[10em] md:text-[12em] lg:text-[16em] xl:text-[20em] [transform:perspective(400px)_rotateX(45deg)] sm:[transform:perspective(800px)_rotateX(45deg)] leading-[0.75] whitespace-break-spaces text-theme-red-400 font-retro [text-shadow:0_0.05em_0_var(--color-theme-red-800)]',
          styles.title
        )}
      >
        {t('title')}
      </h1>

      <h2 className="lg:text-lg">
        <Typewriter duration={2000} paused={subtitlePaused}>
          {t('subtitle')}
        </Typewriter>
      </h2>

      <motion.div
        style={{
          opacity: chevronOpacity,
        }}
        className={classNames(
          'important-opacity absolute bottom-0 right-0 mx-10 my-10 flex flex-col items-center font-retro pointer-events-none',
          styles.chevron
        )}
      >
        <div>SCROLL</div>
        <Icon
          icon="arrow-down"
          className="h-[32px] w-auto"
          viewBox="0 0 16 16"
        />
      </motion.div>
    </Component>
  );
}
