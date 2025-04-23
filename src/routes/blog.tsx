import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import useTitle from '../hooks/useTitle';
import { FrontmatterType } from './blog-post';

// Load posts from src/blog
const postModules = import.meta.glob<Record<string, unknown>>(
  '/src/blog/**/*.mdx',
  { eager: true }
);

// Transaform and sort posts
const posts = Object.entries(postModules)
  .map(([path, module]) => {
    return {
      path: path.replace('/src/blog/', '').replace('.mdx', ''),
      component: module.default,
      frontmatter: module.frontmatter as FrontmatterType,
    };
  })
  .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));

export default function BlogRoute() {
  const { t } = useTranslation('app', { keyPrefix: 'routes.blog' });
  useTitle(t('title'));

  return (
    <div className="container mx-auto flex flex-col items-center text-center">
      <ul>
        {posts.map((post, i) => (
          <li key={i}>
            <NavLink to={`${post.path}`}>{post.frontmatter.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
