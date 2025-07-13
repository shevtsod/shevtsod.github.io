import type { ComponentProps } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import type { BlogPost } from '../../utils/blogPosts';

export interface BlogPostCardProps
  extends Partial<ComponentProps<typeof NavLink>> {
  index?: number;
  blogPost: BlogPost;
}

export default function BlogPostCard({
  index = 1,
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
      <div className="text-sm">
        <div className="flex flex-row">
          <div className="flex flex-col justify-center text-9xl italic font-pixel mr-12 text-zinc-400 dark:text-zinc-900 group-hover:text-gray-400 dark:group-hover:text-zinc-800">
            {index}
          </div>

          <div className="mb-3 flex flex-col text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
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
                values={{ date }}
              />
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
