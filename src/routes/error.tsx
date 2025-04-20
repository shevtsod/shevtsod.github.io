import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router';
import AppError from '../components/appError/AppError';
import useTitle from '../hooks/useTitle';

export default function ErrorRoute() {
  const { t } = useTranslation('app', { keyPrefix: 'routes.error' });
  useTitle(t('title'), { raw: true });
  const error = useRouteError();

  return (
    <AppError className="min-h-[100svh]" title={t('title')} error={error} />
  );
}
