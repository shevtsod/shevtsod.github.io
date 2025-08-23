import { UTCDate } from '@date-fns/utc';
import { compile } from '@mdx-js/mdx';
import { compareDesc, parse } from 'date-fns';
import { readdir } from 'fs/promises';
import { basename, extname, join } from 'path';

/**
 * Represents the estimated reading time for a blog post.
 */
export interface ReadingTime {
  time: number;
  minutes: number;
  words: number;
  text: string;
}

/**
 * Represents one blog post.
 */
export interface BlogPostType {
  slug: string;
  filename: string;
  frontmatter: FrontmatterType;
}

/**
 * Elements expected to be in the frontmatter of every blog post.
 */
interface RawFrontmatterType {
  title?: string;
  description?: string;
  author?: string;
  created?: string;
  updated?: string;
}

/**
 * Frontmatter properties available in a blog post
 */
export interface FrontmatterType
  extends Omit<RawFrontmatterType, 'created' | 'updated'> {
  created?: Date;
  updated?: Date;
}

// Directory containing blog posts
const baseDir = join('src', 'content', 'blog');

// Get filenames of all markdown files
const blogPostFilenames = (await readdir(baseDir)).filter((path) =>
  /.mdx?$/i.test(path),
);

// Transform into BlogPostType elements
export const blogPosts: BlogPostType[] = (
  await Promise.all(
    blogPostFilenames.map(async (filename) => {
      const blogPostModule = await import(`../content/blog/${filename}`);
      const frontmatter: RawFrontmatterType | undefined =
        blogPostModule.frontmatter;

      return {
        // Extract file name without extension
        slug: basename(filename, extname(filename)),
        filename,
        frontmatter: {
          ...frontmatter,
          // Compile MDX in the description
          // https://mdxjs.com/guides/mdx-on-demand/
          description:
            frontmatter?.description &&
            String(
              await compile(frontmatter?.description, {
                outputFormat: 'function-body',
              }),
            ),
          // Convert strings to dates
          created: frontmatter?.created
            ? parse(frontmatter.created, 'yyyy-MM-dd', new UTCDate())
            : undefined,
          updated: frontmatter?.updated
            ? parse(frontmatter.updated, 'yyyy-MM-dd', new UTCDate())
            : undefined,
        },
      };
    }),
  )
)
  // Filter certain posts outside of development
  .filter((bp) =>
    process.env.NODE_ENV === 'development'
      ? true
      : !['markdown-test'].includes(bp.slug),
  )
  // Sort by created date, most recent first
  .sort((a, b) => {
    const dateA = a.frontmatter?.created;
    const dateB = b.frontmatter?.created;
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return compareDesc(new UTCDate(dateA), new UTCDate(dateB));
  });
