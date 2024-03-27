import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface UseTitleOptions {
  /**
   * If true, the given title is set without additional formatting.
   */
  raw?: boolean;
}

/**
 * Updates the document title to the given title.
 *
 * @param title title to set
 */
export default function useTitle(
  title: string = '',
  { raw = false }: UseTitleOptions = {},
) {
  const { t } = useTranslation('app', { keyPrefix: 'routes.root' });
  const formatTitle = (title: string) =>
    (title && `｢${title}｣ · `) + t('title');

  useEffect(() => {
    document.title = raw ? title : formatTitle(title);
  }, [title, raw]);
}
