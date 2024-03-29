import { useEffect, useRef } from 'react';
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
  const titleRef = useRef(title);

  useEffect(() => {
    titleRef.current = title; // Update the ref to the latest title
    const formattedTitle = raw
      ? title
      : (title && `｢${title}｣ · `) + t('title');

    // Set a timeout to allow for any potential quick consecutive updates
    const timeout = setTimeout(() => {
      if (document.title !== formattedTitle) {
        document.title = formattedTitle;
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, [title, raw, t]);

  // Ensure that the latest title is set when the component unmounts
  useEffect(() => {
    return () => {
      document.title = titleRef.current;
    };
  }, []);
}
