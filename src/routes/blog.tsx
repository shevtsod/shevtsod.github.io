import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import useTitle from '../hooks/useTitle';
import { blogPosts } from '../utils/blog';

export default function BlogRoute() {
  const { t } = useTranslation('app', { keyPrefix: 'routes.blog' });
  useTitle(t('title'));

  return (
    <div className="container mx-auto flex flex-col items-center text-center">
      <ul>
        {blogPosts.map((post, i) => (
          <li key={i}>
            <NavLink to={`${post.path}`}>{post.frontmatter.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
