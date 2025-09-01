'use client';

import { PolymorphicComponentProps } from '@/components/polymorphic-component';
import { MotionPolymorphicComponent } from '@/components/polymorphic-component/motion-polymorphic-component';
import useFadeInView from '@/hooks/use-fade-in-view';
import { useIntro } from '@/hooks/use-intro';
import { UTCDate } from '@date-fns/utc';
import classNames from 'classnames';
import {
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTransform,
  useVelocity,
  wrap,
} from 'motion/react';
import { useTranslations } from 'next-intl';
import { ElementType, useRef } from 'react';
import Heading from '../heading';
import SummaryItem from './summary-item';

export type SummaryProps<T extends ElementType> = PolymorphicComponentProps<T>;

/**
 * Renders the summary section.
 */
export default function Summary<T extends ElementType>({
  as,
  className,
  ...props
}: SummaryProps<T>) {
  const ref = useRef(null);
  const t = useTranslations('app.(home).components.summary');
  const [intro] = useIntro();
  useFadeInView(ref, { once: true, margin: '0px 0px -50px 0px', skip: !intro });

  // Start the background position at 0
  const baseBackgroundPositionY = useMotionValue(0);
  const baseBackgroundPositionX = useTransform(
    baseBackgroundPositionY,
    (v) => v * 0.5,
  );
  const { scrollY } = useScroll();
  // Convert scroll position to velocity
  const scrollVelocity = useVelocity(scrollY);
  // Convert velocity to a smaller range
  const scrollVelocityFactor = useTransform(
    scrollVelocity,
    [-1000, 1000],
    [-3, 3],
    { clamp: false },
  );

  // direction to animate to based on scroll direction
  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    // directionFactor * baseVelocity + scrollVelocityFactor
    const moveBy =
      directionFactor.current * 100 * (delta / 1000) +
      scrollVelocityFactor.get();

    if (scrollVelocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (scrollVelocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    baseBackgroundPositionY.set(baseBackgroundPositionY.get() + moveBy);
  });
  // clamp values
  const backgroundPositionX = useTransform(
    baseBackgroundPositionX,
    (v) => `${wrap(0, 256, v)}px`,
  );
  const backgroundPositionY = useTransform(
    baseBackgroundPositionY,
    (v) => `${wrap(0, 256, v)}px`,
  );

  return (
    <MotionPolymorphicComponent
      {...props}
      as={as}
      ref={ref}
      className={classNames(
        `relative py-20 px-6 image-pixelated bg-repeat bg-[length:256px_256px] bg-[url('/images/ui/pipes.gif')]`,
        className,
      )}
      style={{
        backgroundPositionX,
        backgroundPositionY,
      }}
    >
      <div className="container mx-auto">
        <div className="h-[64px] w-full absolute top-0 left-0 z-10 image-pixelated bg-repeat-x bg-[length:64px_64px] bg-[url('/images/ui/dither-y-white.svg')] dark:bg-[url('/images/ui/dither-y-black.svg')]" />

        <Heading
          as="h2"
          className="uppercase text-center mb-6"
          href={`#${props.id}`}
        >
          {t('title')}
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 text-center items-start">
          <SummaryItem
            i18nKey="summary1"
            icon="Code"
            values={{ experienceYears: new UTCDate().getFullYear() - 2017 }}
          />
          <SummaryItem i18nKey="summary2" icon="Lightbulb" />
          <SummaryItem i18nKey="summary3" icon="Human" />
        </div>

        <div className="h-[64px] w-full absolute bottom-0 left-0 z-10 image-pixelated bg-repeat-x bg-[length:64px_64px] bg-[url('/images/ui/dither-y-white.svg')] dark:bg-[url('/images/ui/dither-y-black.svg')] rotate-180" />
      </div>
    </MotionPolymorphicComponent>
  );
}
