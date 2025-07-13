import useTitle from '@/hooks/useTitle';
import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router';
import AppError from '../components/AppError/AppError';

export default function AppErrorRoute() {
  const { t } = useTranslation('app', {
    keyPrefix: 'features.appError.routes.AppErrorRoute',
  });
  useTitle(t('title'), { raw: true });
  const error = useRouteError();

  return (
    <AppError className="min-h-[100svh]" title={t('title')} error={error} />
  );
}
