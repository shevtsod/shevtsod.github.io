import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export interface UseTitleOptions {
  /**
   * If true, the given title is set as is (without formatting).
   */
  raw?: boolean;
}

/**
 * Updates the document title to the given title.
 *
 * @param pageTitle title to set
 * @return original title
 */
export default function useTitle(
  pageTitle: string = '',
  { raw }: UseTitleOptions = { raw: false },
) {
  const [originalTitle] = useState(
    typeof document !== 'undefined' ? document.title : '',
  );
  const t = useTranslations('metadata');

  useEffect(() => {
    document.title = raw
      ? pageTitle
      : [pageTitle ? `｢${pageTitle}｣` : '', t('title')]
          .filter((el) => el)
          .join(' · ');
  }, [t, pageTitle, raw]);

  return originalTitle;
}
