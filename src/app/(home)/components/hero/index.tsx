'use client';

import Icon from '@/components/icon';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
} from '@/components/polymorphic-component';
import Typewriter from '@/components/typewriter';
import { useIntro } from '@/hooks/use-intro';
import classNames from 'classnames';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import { type ElementType, useEffect, useRef, useState } from 'react';
import styles from './hero.module.css';

export type HeroProps<T extends ElementType> = PolymorphicComponentProps<T>;

/**
 * Renders the hero section.
 */
export default function Hero<T extends ElementType>({
  as,
  className,
  ...props
}: HeroProps<T>) {
  const t = useTranslations('app.(home).components.hero');
  const [playSubtitle, setPlaySubtitle] = useState(false);
  const [intro] = useIntro();

  // Start the subtitle animation with a delay
  useEffect(() => {
    if (intro === undefined) return;
    setPlaySubtitle(!intro);
    const timeout = setTimeout(() => setPlaySubtitle(true), 3500);
    return () => clearTimeout(timeout);
  }, [intro]);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  });

  // "SCROLL" chevron visibility based on scroll position
  const chevronOpacity = useTransform(scrollYProgress, [0.1, 0.5], [1, 0]);

  return (
    <PolymorphicComponent
      {...props}
      as={as}
      ref={scrollRef}
      className={classNames(
        'flex [--animation-shine-color:var(--color-red-100)] dark:[--animation-shine-color:var(--color-red-950)]',
        styles.container,
        // add intro class only if intro mode is enabled
        { [styles.intro]: intro },
        className,
      )}
    >
      <div className="container mx-auto relative flex flex-col justify-center text-center overflow-hidden">
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
          <Typewriter duration={!intro ? 0 : 2000} play={playSubtitle}>
            {t('subtitle')}
          </Typewriter>
        </h2>

        <motion.div
          className={classNames(
            'absolute bottom-0 right-0 mx-6 my-12 flex flex-col items-center pointer-events-none gap-2 text-theme-orange-600 dark:text-theme-orange-200',
            styles.chevron,
            // add intro class only if intro mode is enabled
            { [styles.intro]: intro },
          )}
          style={{
            opacity: chevronOpacity,
          }}
        >
          <div className="uppercase font-bold font-pixel">{t('scroll')}</div>
          <Icon icon="ArrowFullDown" className="w-8 h-auto" />
        </motion.div>
      </div>
    </PolymorphicComponent>
  );
}
