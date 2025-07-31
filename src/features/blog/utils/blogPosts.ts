import { compareAsc, parse } from 'date-fns';

/**
 * Represents the data for one blog post
 */
export interface BlogPostType {
  path: string;
  Component: React.ComponentType;
  frontmatter: FrontmatterType;
}

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

// Load posts from src/blog
const blogModules = import.meta.glob<Record<string, unknown>>(
  '/src/blog/**/*.mdx',
  { eager: true }
);

// Transform and sort posts
export const blogPosts: BlogPostType[] = Object.entries(blogModules)
  .map(([path, module]) => {
    const frontmatter = module.frontmatter as RawFrontmatterType;

    return {
      path: path.replace(/^\/src\/blog\/|\.mdx$/g, ''),
      Component: module.default,
      frontmatter: {
        ...frontmatter,
        date: parse(frontmatter.date, 'yyyy-MM-dd', new Date()),
      },
    } as BlogPostType;
  })
  .sort((a, b) => compareAsc(a.frontmatter.date, b.frontmatter.date));
