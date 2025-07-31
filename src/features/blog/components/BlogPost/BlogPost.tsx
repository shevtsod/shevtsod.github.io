import Button from '@/components/Button/Button';
import ScrambledText from '@/components/ScrambledText/ScrambledText';
import { formatISO } from 'date-fns';
import { Trans, useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import type { BlogPostType } from '../../utils/blogPosts';

export interface BlogPostProps {
  blogPost: BlogPostType;
}

export default function BlogPost({ blogPost }: BlogPostProps) {
  const { t } = useTranslation('app', {
    keyPrefix: 'features.blog.components.BlogPost',
  });

  const {
    frontmatter: { title, description, author, date },
    Component,
  } = blogPost;

  return (
    <article className="max-w-3xl mx-auto pb-6 px-4 md:px-0">
      <div className="text-sm">
        <div className="mb-6 flex flex-col text-zinc-500">
          <h1 className="text-5xl mb-6">{title}</h1>

          <p className="font-bold mb-6">{description}</p>

          <span>
            <Trans
              t={t}
              i18nKey="postedBy"
              components={{ b: <b /> }}
              values={{ author }}
            />
          </span>

          <span>
            <Trans
              t={t}
              i18nKey="postedOn"
              components={{ b: <b /> }}
              values={{ date: formatISO(date) }}
            />
          </span>
        </div>
      </div>

      <div className="prose xl:prose-xl dark:prose-invert">
        <Component />
      </div>

      <div className="my-4">
        <Button as={NavLink} to="/blog" end className="font-bold">
          <ScrambledText>{t('backToBlog')}</ScrambledText>
        </Button>
      </div>
    </article>
  );
}
