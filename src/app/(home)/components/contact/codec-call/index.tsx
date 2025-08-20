import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { HTMLAttributes } from 'react';
import styles from './codec-call.module.css';

export interface CodecCallProps extends HTMLAttributes<HTMLDivElement> {}

export default function CodecCall({ className, ...props }: CodecCallProps) {
  const t = useTranslations('app.(home).components.contact.codec-call');

  return (
    <div
      {...props}
      className={classNames(
        'font-pixel bg-white dark:bg-black flex-1 flex flex-col',
        styles.codecCall,
        className,
      )}
    >
      <div
        className={classNames(
          'flex-1 flex flex-col items-center justify-center',
          styles.codecCallContent,
        )}
      >
        <div className="text-2xl md:text-3xl lg:text-6xl bg-theme-red-400 text-black px-8 my-2 uppercase shadow-[0_0px_1.5rem_var(--color-theme-red-400)]">
          {t('call')}
        </div>
        <div className="text-xl md:text-2xl lg:text-4xl">
          {t('push-select')}
        </div>
      </div>
    </div>
  );
}
