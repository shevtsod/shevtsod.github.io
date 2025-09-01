import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';

export interface AppErrorProps extends ComponentProps<'div'> {
  title?: string;
  error?: Error;
}

/**
 * UI for displaying the message of an {@link Error} object.
 */
export default function AppError({
  title,
  error,
  className,
  ...props
}: AppErrorProps) {
  const t = useTranslations('components.app-error');
  const message = error?.message ?? t('messages.unexpected');

  return (
    <div
      {...props}
      className={classNames(
        'flex flex-col justify-center text-center',
        className,
      )}
    >
      <h1 className="text-9xl font-retro text-theme-red-400 uppercase">
        {title ?? t('title')}
      </h1>
      {message && (
        <p className="text-lg font-mono text-black dark:text-white">
          {message}
        </p>
      )}
    </div>
  );
}
