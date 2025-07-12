/**
 * Represents the data for one blog post
 */
export interface BlogPost {
  path: string;
  component: React.ComponentType;
  frontmatter: FrontmatterType;
}

/**
 * Frontmatter properties available in a blog post
 */
export interface FrontmatterType {
  title: string;
  description: string;
  date: string;
  author: string;
}

// Load posts from src/blog
const blogModules = import.meta.glob<Record<string, unknown>>(
  '/src/blog/**/*.mdx',
  { eager: true }
);

// Transform and sort posts
export const blogPosts: BlogPost[] = Object.entries(blogModules)
  .map(([path, module]) => {
    return {
      path: path.replace('/src/blog/', '').replace('.mdx', ''),
      component: module.default,
      frontmatter: module.frontmatter,
    } as BlogPost;
  })
  .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
