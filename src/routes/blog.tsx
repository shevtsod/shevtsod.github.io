import Index from '@/blog/index.mdx';
import { useTranslation } from 'react-i18next';
import useTitle from '../hooks/useTitle';

export default function BlogRoute() {
  const { t } = useTranslation('app', { keyPrefix: 'routes.blog' });
  useTitle(t('title'));

  return (
    <article className="container mx-auto py-6 prose xl:prose-xl dark:prose-invert">
      <Index />
    </article>
  );
}
