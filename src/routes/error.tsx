import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';
import AppError from '../components/appError/AppError';

export default function ErrorRoute() {
  const { t } = useTranslation('app', { keyPrefix: 'routes.error' });
  const error = useRouteError();

  return (
    <main>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <AppError className="min-h-[100svh]" title={t('title')} error={error} />
    </main>
  );
}
