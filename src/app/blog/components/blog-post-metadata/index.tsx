import Icon from '@/components/icon';
import { FrontmatterType, ReadingTime } from '@/utils/blog';
import { UTCDate } from '@date-fns/utc';
import { run } from '@mdx-js/mdx';
import { Toc } from '@stefanprobst/rehype-extract-toc';
import classNames from 'classnames';
import { format } from 'date-fns';
import { MDXModule } from 'mdx/types';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import * as runtime from 'react/jsx-runtime';
import TableOfContents from '../table-of-contents';

export interface BlogPostMetadataProps {
  frontmatter: FrontmatterType;
  readingTime?: ReadingTime;
  tableOfContents?: Toc;
  showDescription?: boolean;
  className?: string;
}

export default function BlogPostMetadata({
  frontmatter,
  readingTime,
  tableOfContents: originalTableOfContents,
  showDescription = true,
  className,
}: BlogPostMetadataProps) {
  const t = useTranslations('app.blog.components.blog-post-metadata');
  const { title, descriptionMdx, author, created, updated, tags } = frontmatter;
  const [description, setDescription] = useState<MDXModule | undefined>(
    undefined,
  );
  const Description = description?.default;

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

  // Append more headings to automatically generated table of contents
  const [tableOfContents] = useState(
    originalTableOfContents
      ? [
          ...originalTableOfContents,
          {
            depth: 1,
            value: t('comments'),
            id: 'comments',
          },
        ]
      : undefined,
  );

  return (
    <div
      className={classNames('flex flex-col text-zinc-500 text-sm', className)}
    >
      <h1 className="text-2xl md:text-4xl font-bold text-theme-red-400 font-retro">
        {title}
      </h1>

      {showDescription && (
        <h2 className="text-lg font-bold prose dark:prose-invert text-inherit my-4">
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

      {/* Table of Contents */}
      {tableOfContents && (
        <TableOfContents tableOfContents={tableOfContents} className="my-4" />
      )}
    </div>
  );
}
