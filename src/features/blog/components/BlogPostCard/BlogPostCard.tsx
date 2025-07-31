import { formatISO } from 'date-fns';
import type { ComponentProps } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import type { BlogPostType } from '../../utils/blogPosts';

export interface BlogPostCardProps
  extends Partial<ComponentProps<typeof NavLink>> {
  index?: number;
  blogPost: BlogPostType;
}

export default function BlogPostCard({
  index = 0,
  blogPost,
  ...props
}: BlogPostCardProps) {
  const { t } = useTranslation('app', {
    keyPrefix: 'features.blog.components.BlogPostCard',
  });

  const {
    frontmatter: { title, description, author, date },
    path,
  } = blogPost;

  return (
    <NavLink {...props} to={path} className="group">
      <div className="text-sm mb-4">
        <div className="flex flex-row">
          <div className="text-right flex-1 flex flex-col justify-center text-9xl italic font-pixel mr-4 text-zinc-400 dark:text-zinc-900 group-hover:text-gray-400 dark:group-hover:text-zinc-800">
            {index}
          </div>

          <div className="flex-3 flex flex-col text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
            <h1 className="text-3xl mb-3">{title}</h1>

            <p className="font-bold mb-3">{description}</p>

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
      </div>
    </NavLink>
  );
}
