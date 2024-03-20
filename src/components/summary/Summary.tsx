import { useInView } from 'framer-motion';
import CodeIcon from 'pixelarticons/svg/code.svg?react';
import HumanIcon from 'pixelarticons/svg/human.svg?react';
import SunAltIcon from 'pixelarticons/svg/sun-alt.svg?react';
import { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styles from './Summary.module.css';

interface SummaryItemProps {
  className?: string;
  icon?: React.ElementType;
  i18nKey: string;
}

function SummaryItem({
  className = '',
  icon: Icon,
  i18nKey,
}: SummaryItemProps) {
  const { t } = useTranslation(undefined, { keyPrefix: 'components.Summary' });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={`${isInView ? 'animate-fade-in' : 'invisible'} text-gray-50 ${className}`}
    >
      <div className="flex justify-center m-8 text-primary">
        {Icon && <Icon className={`${styles.icon} h-24 w-24 p-4`} />}
      </div>
      <p>
        <Trans
          t={t}
          i18nKey={i18nKey}
          components={{
            highlight: <span className="font-bold text-black bg-primary p-1" />,
          }}
        />
      </p>
    </div>
  );
}

export interface SummaryProps {
  className?: string;
}

export default function Summary({ className = '' }: SummaryProps) {
  const { t } = useTranslation(undefined, { keyPrefix: 'components.Summary' });

  return (
    <section
      id="summary"
      className={`${styles.section} py-12 px-6 bg-repeat bg-[length:64px] bg-[image:url("/images/crosshair.png")] bg-black [image-rendering:pixelated] opacity-65 font-mono ${className}`}
    >
      <div className="flex justify-center pb-4">
        <span className="px-2 text-xl md:text-4xl font-bold text-black bg-primary uppercase text-center">
          {t('title')}
        </span>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-10 text-center items-start">
        <SummaryItem i18nKey="summary1" icon={CodeIcon} />
        <SummaryItem i18nKey="summary2" icon={SunAltIcon} />
        <SummaryItem i18nKey="summary3" icon={HumanIcon} />
      </div>
    </section>
  );
}
