import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse } from 'react-router-dom';

export interface AppErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  error?: unknown;
}

export default function AppError({
  title,
  error,
  className,
  ...props
}: AppErrorProps) {
  const { t } = useTranslation('app', { keyPrefix: 'components.AppError' });

  let message = t('messages.unexpected');

  if (error) {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        message = t('messages.404');
      } else {
        message = error.data?.message;
      }
    }
  }

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
      {message && <p className="text-lg">{message}</p>}
    </div>
  );
}
