import React, { Suspense, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import useTitle from '../hooks/useTitle';

/**
 * Frontmatter properties available in a blog post
 */
export interface FrontmatterType {
  title: string;
  description: string;
  date: string;
  author: string;
}

export default function BlogPostRoute() {
  const { t } = useTranslation('app', { keyPrefix: 'routes.blog-post' });
  const { path } = useParams();

  const [frontmatter, setFrontmatter] = useState<FrontmatterType | null>(null);

  useTitle(frontmatter?.title ?? t('title'));

  useEffect(() => {
    import(`../blog/${path}.mdx`).then((module) =>
      setFrontmatter(module.frontmatter)
    );
  }, [path, setFrontmatter]);

  const Post = React.lazy(async () => import(`../blog/${path}.mdx`));

  return (
    <article className="container mx-auto py-6 px-2 md:px-0 prose xl:prose-xl dark:prose-invert">
      <Suspense>
        <h1>{frontmatter?.title}</h1>
        <div className="italic text-sm">
          <div>
            {' '}
            <Trans
              t={t}
              i18nKey="postedBy"
              components={{ b: <b /> }}
              values={{ author: frontmatter?.author }}
            />
          </div>

          <div>
            <Trans
              t={t}
              i18nKey="postedOn"
              components={{ b: <b /> }}
              values={{ date: frontmatter?.date }}
            />
          </div>
        </div>

        <Post />
      </Suspense>
    </article>
  );
}
