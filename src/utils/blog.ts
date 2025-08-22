import { compile } from '@mdx-js/mdx';
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
  title?: string;
  description?: string;
  date?: string;
  author?: string;
}

/**
 * Frontmatter properties available in a blog post
 */
export interface FrontmatterType extends Omit<RawFrontmatterType, 'date'> {
  date?: Date;
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
          // Convert string to date
          date: frontmatter?.date
            ? parse(frontmatter.date, 'yyyy-MM-dd', new Date())
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
  // Sort by date, most recent first
  .sort((a, b) => {
    const dateA = a.frontmatter?.date;
    const dateB = b.frontmatter?.date;
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return compareDesc(new Date(dateA), new Date(dateB));
  });
