'use client';

import useFadeInView from '@/hooks/use-fade-in-view';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
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
  useFadeInView(ref, { once: true });

  return (
    <Component
      ref={ref}
      {...props}
      style={{ backgroundImage: `url("/images/pipes.gif")` }}
      className={classNames(
        `relative py-20 px-6 image-pixelated bg-repeat bg-[length:256px_256px]`,
        styles.section,
        className,
      )}
    >
      <div
        style={{ backgroundImage: `url("/images/dither-y.svg")` }}
        className="h-[64px] w-full absolute top-0 left-0 z-10 image-pixelated bg-repeat-x bg-[length:64px_64px]"
      />

      <Heading as="h2" className="uppercase text-center" href={`#${props.id}`}>
        {t('title')}
      </Heading>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-10 text-center items-start">
        <SummaryItem
          i18nKey="summary1"
          icon="code"
          values={{ experienceYears: new Date().getFullYear() - 2017 }}
        />
        <SummaryItem i18nKey="summary2" icon="lightbulb" />
        <SummaryItem i18nKey="summary3" icon="human" />
      </div>

      <div
        style={{ backgroundImage: `url("/images/dither-y.svg")` }}
        className="h-[64px] w-full absolute bottom-0 left-0 z-10 image-pixelated bg-repeat-x bg-[length:64px_64px] rotate-180"
      />
    </Component>
  );
}
