import classNames from 'classnames';
import { ComponentPropsWithoutRef, ElementType, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import crosshairImage from '../../../../assets/images/crosshair.webp';
import useFadeInView from '../../../../hooks/useFadeInView';
import Heading from '../../../heading/Heading';
import Icon from '../../../icon/Icon';
import styles from './Summary.module.css';

interface SummaryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  i18nKey: string;
}

function SummaryItem({ className, icon, i18nKey }: SummaryItemProps) {
  const { t } = useTranslation('app', { keyPrefix: 'components.Summary' });
  const ref = useRef(null);
  useFadeInView(ref, { once: true });

  return (
    <div ref={ref} className={classNames('text-theme-gray-200 ', className)}>
      <div className="flex justify-center m-8 text-theme-red-400">
        {icon && (
          <Icon
            icon={icon}
            className={classNames('h-24 w-24 p-4 hover:scale-125', styles.icon)}
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
  const { t } = useTranslation('app', { keyPrefix: 'components.Summary' });

  return (
    <Component
      {...props}
      style={{ backgroundImage: `url("${crosshairImage}")` }}
      className={classNames(
        `py-12 px-6 bg-repeat bg-[length:128px] image-pixelated bg-theme-gray-800`,
        styles.section,
        className,
      )}
    >
      <Heading as="h2" className="mb-4 uppercase text-center">
        {t('title')}
      </Heading>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-10 text-center items-start">
        <SummaryItem i18nKey="summary1" icon="code" />
        <SummaryItem i18nKey="summary2" icon="lightbulb" />
        <SummaryItem i18nKey="summary3" icon="human" />
      </div>
    </Component>
  );
}
