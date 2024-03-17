import { useTranslation } from 'react-i18next';

/**
 * Returns title with suffix
 *
 * @param title title to set
 * @returns title with suffix
 */
export default function useTitle(title?: string) {
  const { t } = useTranslation(undefined, { keyPrefix: 'routes.root' });
  return title ? `${title} | ${t('title')}` : t('title');
}
