'use client';

import useFadeInView from '@/hooks/use-fade-in-view';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
} from 'react';
import Heading from '../heading';
import SummaryItem from './summary-item';
import styles from './summary.module.css';

export type SummaryProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Renders the summary section.
 */
export default function Summary<T extends ElementType>({
  as,
  className,
  ...props
}: SummaryProps<T>) {
  const Component = as ?? 'div';
  const t = useTranslations('app.(home).components.summary');
  const ref = useRef(null);
  const [intro, setIntro] = useState(true);
  useFadeInView(ref, { once: true, margin: '0px 0px -50px 0px', skip: !intro });

  useEffect(() => {
    setIntro(!window.location.hash);
  }, []);

  return (
    <Component
      ref={ref}
      {...props}
      className={classNames(
        `relative py-20 px-6 image-pixelated bg-repeat bg-[length:256px_256px] bg-[url('/images/ui/pipes.gif')]`,
        styles.section,
        className,
      )}
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
            values={{ experienceYears: new Date().getFullYear() - 2017 }}
          />
          <SummaryItem i18nKey="summary2" icon="Lightbulb" />
          <SummaryItem i18nKey="summary3" icon="Human" />
        </div>

        <div className="h-[64px] w-full absolute bottom-0 left-0 z-10 image-pixelated bg-repeat-x bg-[length:64px_64px] bg-[url('/images/ui/dither-y-white.svg')] dark:bg-[url('/images/ui/dither-y-black.svg')] rotate-180" />
      </div>
    </Component>
  );
}
