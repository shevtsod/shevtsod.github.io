import { compareDesc, parse } from 'date-fns';
import { readdir } from 'fs/promises';
import { basename, extname, join } from 'path';

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
  title: string;
  description: string;
  date: string;
  author: string;
}

/**
 * Frontmatter properties available in a blog post
 */
export interface FrontmatterType extends Omit<RawFrontmatterType, 'date'> {
  date: Date;
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
      const { frontmatter } = await import(`../content/blog/${filename}`);

      return {
        // Extract file name without extension
        slug: basename(filename, extname(filename)),
        filename,
        frontmatter: {
          ...frontmatter,
          // Convert string to date
          date: parse(frontmatter.date, 'yyyy-MM-dd', new Date()),
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
  // Sort by date, most recent first
  .sort((a, b) => compareDesc(a.frontmatter.date, b.frontmatter.date));
