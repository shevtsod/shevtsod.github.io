import Icon, { IconKey } from '@/components/icon';
import classNames from 'classnames';
import { RichTagsFunction, useTranslations } from 'next-intl';
import { ComponentProps } from 'react';
import styles from './summary-item.module.css';

interface SummaryItemProps extends ComponentProps<'div'> {
  icon?: IconKey;
  i18nKey: string;
  values?: Record<string, string | number | Date | RichTagsFunction>;
}

/**
 * Renders one summary item.
 */
export default function SummaryItem({
  className,
  icon,
  i18nKey,
  values,
}: SummaryItemProps) {
  const t = useTranslations('app.(home).components.summary.summary-item');

  return (
    <div className={classNames('text-theme-gray-200 ', className)}>
      <div className="flex justify-center">
        {icon && (
          <Icon
            icon={icon}
            className={classNames(
              'h-24 w-24 p-4 m-8 text-theme-red-400',
              styles.icon,
            )}
          />
        )}
      </div>
      <p>
        {t.rich(i18nKey, {
          highlight: (chunks) => (
            <span className="font-bold text-black bg-theme-red-400 p-1">
              {chunks}
            </span>
          ),
          ...values,
        })}
      </p>
    </div>
  );
}
