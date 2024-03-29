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

  useEffect(() => {
    document.title = raw ? title : (title && `｢${title}｣ · `) + t('title');
  }, [title, raw, t]);
}
