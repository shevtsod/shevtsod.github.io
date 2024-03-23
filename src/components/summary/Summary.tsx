import classNames from 'classnames';
import { useInView } from 'framer-motion';
import CodeIcon from 'pixelarticons/svg/code.svg?react';
import HumanIcon from 'pixelarticons/svg/human.svg?react';
import SunAltIcon from 'pixelarticons/svg/sun-alt.svg?react';
import { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import crosshairImage from '../../assets/images/crosshair.webp';
import Heading from '../heading/Heading';
import styles from './Summary.module.css';

interface SummaryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ElementType;
  i18nKey: string;
}

function SummaryItem({ className, icon: Icon, i18nKey }: SummaryItemProps) {
  const { t } = useTranslation('app', { keyPrefix: 'components.Summary' });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={classNames(
        {
          'animate-fade-in': isInView,
          invisible: !isInView,
        },
        'text-theme-gray-200',
        className,
      )}
    >
      <div className="flex justify-center m-8 text-theme-red-400">
        {Icon && <Icon className={classNames('h-24 w-24 p-4', styles.icon)} />}
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
        />
      </p>
    </div>
  );
}

export interface SummaryProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Summary({ className, ...props }: SummaryProps) {
  const { t } = useTranslation('app', { keyPrefix: 'components.Summary' });

  return (
    <div
      {...props}
      style={{ backgroundImage: `url("${crosshairImage}")` }}
      className={classNames(
        `py-12 px-6 bg-repeat bg-[length:128px] [image-rendering:pixelated] bg-theme-gray-800`,
        styles.section,
        className,
      )}
    >
      <Heading as="h2" className="mb-4 uppercase">
        {t('title')}
      </Heading>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-10 text-center items-start">
        <SummaryItem i18nKey="summary1" icon={CodeIcon} />
        <SummaryItem i18nKey="summary2" icon={SunAltIcon} />
        <SummaryItem i18nKey="summary3" icon={HumanIcon} />
      </div>
    </div>
  );
}
