import ditherYImage from '@/assets/images/dither-y.svg';
import pipesImage from '@/assets/images/pipes.gif';
import Icon from '@/components/Icon/Icon';
import useFadeInView from '@/hooks/useFadeInView';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef, type ElementType, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Heading from '../Heading/Heading';
import styles from './Summary.module.css';

const DATE = new Date();
const YEAR = DATE.getFullYear();

interface SummaryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  i18nKey: string;
  values?: {};
}

function SummaryItem({ className, icon, i18nKey, values }: SummaryItemProps) {
  const { t } = useTranslation('app', {
    keyPrefix: 'features.home.components.Summary',
  });
  const ref = useRef(null);
  useFadeInView(ref, { once: true });

  return (
    <div ref={ref} className={classNames('text-theme-gray-200 ', className)}>
      <div className="flex justify-center m-8">
        {icon && (
          <Icon
            icon={icon}
            className={classNames(
              'h-24 w-24 p-4 text-theme-red-400',
              styles.icon
            )}
          />
        )}
      </div>
      <p>
        <Trans
          t={t}
          i18nKey={i18nKey}
          components={{
            highlight: (
              <span className="font-bold text-theme-gray-800 bg-theme-red-400 p-1" />
            ),
          }}
          values={values}
        />
      </p>
    </div>
  );
}

export type SummaryProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export default function Summary<T extends ElementType>({
  as,
  className,
  ...props
}: SummaryProps<T>) {
  const Component = as ?? 'div';
  const { t } = useTranslation('app', {
    keyPrefix: 'features.home.components.Summary',
  });

  return (
    <Component
      {...props}
      style={{ backgroundImage: `url("${pipesImage}")` }}
      className={classNames(
        `relative py-24 px-6 image-pixelated bg-repeat bg-[length:256px_256px]`,
        styles.section,
        className
      )}
    >
      <div
        style={{ backgroundImage: `url("${ditherYImage}")` }}
        className="h-[64px] w-full absolute top-0 left-0 z-10 image-pixelated bg-repeat-x bg-[length:64px_64px]"
      />

      <Heading
        as="h2"
        className="mb-4 uppercase text-center"
        href={`#${props.id}`}
      >
        {t('title')}
      </Heading>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-10 text-center items-start">
        <SummaryItem
          i18nKey="summary1"
          icon="code"
          values={{ experienceYears: YEAR - 2017 }}
        />
        <SummaryItem i18nKey="summary2" icon="lightbulb" />
        <SummaryItem i18nKey="summary3" icon="human" />
      </div>

      <div
        style={{ backgroundImage: `url("${ditherYImage}")` }}
        className="h-[64px] w-full absolute bottom-0 left-0 z-10 image-pixelated bg-repeat-x bg-[length:64px_64px] rotate-180"
      />
    </Component>
  );
}
