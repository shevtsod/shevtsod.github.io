'use client';

import Icon from '@/components/icon';
import Typewriter from '@/components/typewriter';
import { useIntro } from '@/hooks/use-intro';
import classNames from 'classnames';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './hero.module.css';

export type HeroProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Renders the hero section.
 */
export default function Hero<T extends ElementType>({
  as,
  className,
  ...props
}: HeroProps<T>) {
  const Component = as ?? 'div';
  const t = useTranslations('app.(home).components.hero');
  const [subtitlePaused, setSubtitlePaused] = useState(true);
  const [intro] = useIntro();

  // Start the subtitle animation with a delay
  useEffect(() => {
    setSubtitlePaused(!!intro);
    const timeout = setTimeout(() => setSubtitlePaused(false), 3500);
    return () => clearTimeout(timeout);
  }, [intro]);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  });

  // "SCROLL" chevron visibility based on scroll position
  const chevronOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.19, 0.2, 0.39, 0.4],
    [1, 1, 0.5, 0.5, 0],
  );

  return (
    <Component
      {...props}
      ref={scrollRef}
      className={classNames(
        'container mx-auto relative flex flex-col justify-center text-center overflow-hidden',
        className,
      )}
    >
      <div className="relative">
        {/* Render shadow separately (second element required for text-shadow when using background-clip: text) */}
        {[...Array(2)].map((_, i) => (
          <h1
            key={i}
            className={classNames(
              'mb-16 text-[6em] sm:text-[10em] md:text-[12em] lg:text-[16em] xl:text-[18em] 2xl:text-[20em] [transform:perspective(400px)_rotateX(45deg)] sm:[transform:perspective(800px)_rotateX(45deg)] leading-[0.75] whitespace-break-spaces font-retro',
              styles.title,
              // add intro class only if intro mode is enabled
              { [styles.intro]: intro },
              {
                'absolute top-0 left-0 w-full [text-shadow:0_0.05em_0_var(--color-theme-red-800)] pointer-events-none':
                  i === 0,
              },
            )}
          >
            {t('title')}
          </h1>
        ))}
      </div>

      <h2 className="lg:text-lg">
        <Typewriter
          duration={intro === false ? 0 : 2000}
          paused={subtitlePaused}
        >
          {t('subtitle')}
        </Typewriter>
      </h2>

      <motion.div
        style={{
          opacity: chevronOpacity,
        }}
        className={classNames(
          'important-opacity absolute bottom-0 right-0 mx-10 my-10 flex flex-col items-center font-retro pointer-events-none',
          styles.chevron,
          // add intro class only if intro mode is enabled
          { [styles.intro]: intro },
        )}
      >
        <div>SCROLL</div>
        <Icon
          icon="ArrowDown"
          className="h-[32px] w-auto"
          viewBox="0 0 16 16"
        />
      </motion.div>
    </Component>
  );
}
