'use client';

import Button from '@/components/button';
import Icon from '@/components/icon';
import ScrambledText from '@/components/scrambled-text';
import { useTheme } from '@/components/theme';
import { CustomH } from '@/mdx-components';
import type { BlogPostType, ReadingTime } from '@/utils/blog';
import Giscus from '@giscus/react';
import { Toc } from '@stefanprobst/rehype-extract-toc';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import BlogPostMetadata from '../../../components/blog-post-metadata';

export interface BlogPostProps {
  children: React.ReactNode;
  blogPost: BlogPostType;
  readingTime: ReadingTime;
  tableOfContents: Toc;
  prevBlogPost?: BlogPostType;
  nextBlogPost?: BlogPostType;
}

/**
 * Renders the given components as a blog post.
 */
export default function BlogPost({
  children,
  blogPost,
  readingTime,
  tableOfContents,
  prevBlogPost,
  nextBlogPost,
}: BlogPostProps) {
  const locale = useLocale();
  const t = useTranslations('app.blog.[slug].components.blog-post');
  const { theme } = useTheme();
  const { scrollY } = useScroll();
  const invertedHalfScrollY = useTransform(scrollY, (val) => val * -0.5 - 400);
  const { frontmatter } = blogPost;
  const { imageUrl } = frontmatter;

  return (
    <article className="grow font-sans flex flex-col">
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full max-h-96">
          {/* Background blur */}
          <motion.div
            className="absolute h-full w-full bg-cover opacity-25"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundPositionY: invertedHalfScrollY,
            }}
            transition={{ ease: 'linear' }}
          />
          {/* Foreground image */}
          <Image
            src={imageUrl}
            width={1280}
            height={720}
            alt={t('image')}
            className="z-1 w-full h-auto max-h-96 object-contain backdrop-blur-xl"
          />
        </div>
      )}

      <div className="flex-1 w-full max-w-3xl mx-auto my-8 px-4 md:px-0 flex flex-col">
        {/* Metadata */}
        <BlogPostMetadata
          frontmatter={frontmatter}
          readingTime={readingTime}
          tableOfContents={tableOfContents}
        />

        {/* Content */}
        <div className="stretch grow-1 w-full prose dark:prose-invert max-w-3xl">
          {children}
        </div>

        {/* Links */}
        <div className="my-4 flex gap-2 justify-between items-center text-center [&>*]:flex-1">
          <div>
            {prevBlogPost && (
              <Link
                href={`/blog/${prevBlogPost.slug}`}
                className="text-theme-red-400 underline flex justify-center items-center"
              >
                <Icon
                  icon="ArrowDown"
                  className="shrink-0 h-4 w-auto rotate-90"
                />
                <span className="flex-1">{prevBlogPost.frontmatter.title}</span>
              </Link>
            )}
          </div>

          <Button as={Link} href="/blog" className="h-full w-full font-bold">
            <ScrambledText className="block">{t('backToBlog')}</ScrambledText>
          </Button>

          <div>
            {nextBlogPost && (
              <Link
                href={`/blog/${nextBlogPost.slug}`}
                className="text-theme-red-400 underline flex justify-center items-center"
              >
                <span className="flex-1">{nextBlogPost.frontmatter.title}</span>
                <Icon
                  icon="ArrowDown"
                  className="shrink-0 h-4 w-auto rotate-270"
                />
              </Link>
            )}
          </div>
        </div>

        {/* Comments */}
        <CustomH as="h1" id="comments" className="text-4xl font-bold">
          {t('comments')}
        </CustomH>

        {/* https://giscus.app/ */}
        <div className="overflow-x-auto">
          <Giscus
            id="comments"
            repo="shevtsod/shevtsod.github.io"
            repoId="R_kgDOI0bUEA"
            category="Announcements"
            categoryId="DIC_kwDOI0bUEM4CudQg"
            mapping="pathname"
            strict="1"
            reactionsEnabled="1"
            inputPosition="top"
            theme={theme}
            lang={locale}
            loading="eager"
          />

          <div className="text-sm italic text-right">
            {t.rich('commentsAttribution', {
              link: () => (
                <Link
                  href="https://giscus.app/"
                  target="_blank"
                  className="text-theme-red-400 underline"
                >
                  giscus
                </Link>
              ),
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
