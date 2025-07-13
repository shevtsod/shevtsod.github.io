import useTitle from '@/hooks/useTitle';
import { Suspense } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { blogPosts } from '../utils/blogPosts';

export default function BlogPostRoute() {
  const { t } = useTranslation('app', {
    keyPrefix: 'features.blog.routes.BlogPostRoute',
  });
  const { path } = useParams();
  const blogPost = blogPosts.find((el) => el.path === path);

  console.log(path);

  if (!blogPost) {
    throw new Error('Blog post not found!');
  }

  const { frontmatter, component: BlogPost } = blogPost;
  const { title, author, date } = frontmatter;

  useTitle(title ?? t('title'));

  return (
    <article className="container mx-auto py-6 px-2 md:px-0 prose xl:prose-xl dark:prose-invert">
      <Suspense>
        <h1>{title}</h1>
        <div className="italic text-sm">
          <div>
            {' '}
            <Trans
              t={t}
              i18nKey="postedBy"
              components={{ b: <b /> }}
              values={{ author }}
            />
          </div>

          <div>
            <Trans
              t={t}
              i18nKey="postedOn"
              components={{ b: <b /> }}
              values={{ date }}
            />
          </div>
        </div>

        <BlogPost />
      </Suspense>
    </article>
  );
}
