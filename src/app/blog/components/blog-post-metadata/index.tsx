import Icon from '@/components/icon';
import { FrontmatterType, ReadingTime } from '@/utils/blog';
import { UTCDate } from '@date-fns/utc';
import { run } from '@mdx-js/mdx';
import classNames from 'classnames';
import { format } from 'date-fns';
import { MDXModule } from 'mdx/types';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import * as runtime from 'react/jsx-runtime';

export interface BlogPostMetadataProps {
  frontmatter: FrontmatterType;
  readingTime?: ReadingTime;
  showDescription?: boolean;
  className?: string;
}

export default function BlogPostMetadata({
  frontmatter,
  readingTime,
  showDescription = true,
  className,
}: BlogPostMetadataProps) {
  const t = useTranslations('app.blog.components.blog-post-metadata');
  const { title, descriptionMdx, author, created, updated, tags } = frontmatter;
  const [description, setDescription] = useState<MDXModule | undefined>(
    undefined,
  );
  const Description = description?.default;
  // Determine if showing a preview or the complete metadata
  const preview = !showDescription;

  // https://mdxjs.com/guides/mdx-on-demand/
  useEffect(() => {
    if (descriptionMdx && showDescription) {
      (async function () {
        setDescription(
          await run(descriptionMdx, { ...runtime, baseUrl: import.meta.url }),
        );
      })();
    }
  }, [descriptionMdx, showDescription]);

  return (
    <div
      className={classNames(
        'flex flex-col gap-4 text-zinc-500 text-sm',
        className,
      )}
    >
      <h1
        className={classNames(
          'text-2xl md:text-4xl font-bold text-theme-red-400 font-retro decoration-4',
          { 'text-3xl md:text-5xl': !preview },
          { 'hover:underline group-hover:underline': preview },
        )}
      >
        {title}
      </h1>

      {showDescription && (
        <h2 className="text-lg font-bold prose dark:prose-invert text-inherit">
          {Description ? (
            <Description />
          ) : (
            <p className="h-8 w-full rounded bg-theme-gray-100 dark:bg-theme-gray-600" />
          )}
        </h2>
      )}

      <span className="inline-flex gap-4 flex-wrap">
        {author && author !== 'shevtsod' && (
          <span title={t('author.title')}>
            {t.rich('author.text', {
              b: (chunks) => <b>{chunks}</b>,
              author,
            })}
          </span>
        )}

        {readingTime && (
          <span title={t('readingTime.title')} className="inline-flex gap-2">
            <Icon icon="Clock" className="w-[1em] h-auto inline-block" />
            {t('readingTime.text', {
              minutes: Math.ceil(readingTime.minutes),
            })}
          </span>
        )}

        {created && (
          <span title={t('created.title')} className="inline-flex gap-2">
            <Icon icon="Plus" className="w-[1em] h-auto inline-block" />
            {format(new UTCDate(created), 'PP')}
          </span>
        )}

        {updated && (
          <span title={t('updated.title')} className="inline-flex gap-2">
            <Icon icon="Pencil" className="w-[1em] h-auto inline-block" />
            {format(new UTCDate(updated), 'PP')}
          </span>
        )}

        {tags.length > 0 && (
          <span title={t('tags.title')} className="inline-flex gap-1">
            <Icon icon="Tag" className="w-[1em] h-auto inline-block" />
            {tags.map((tag, i) => (
              <span key={i}>
                {tag}
                {i < tags.length - 1 && <span>, </span>}
              </span>
            ))}
          </span>
        )}
      </span>
    </div>
  );
}
