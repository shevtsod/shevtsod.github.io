'use client';

import projects from '@/content/projects';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import {
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
} from 'react';
import Heading from '../heading';
import Project from './project';

export type ProjectsProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Renders the projects section.
 */
export default function Projects<T extends ElementType>({
  as,
  className,
  ...props
}: ProjectsProps<T>) {
  const Component = as ?? 'div';
  const t = useTranslations('app.(home).components.projects');
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    setIntro(!window.location.hash);
  }, []);

  return (
    <Component {...props} className={classNames('pt-6', className)}>
      <div>
        <Heading
          as="h2"
          className="uppercase text-center mb-6"
          href={`#${props.id}`}
        >
          {t('title')}
        </Heading>

        <ul className="flex flex-col">
          {projects.map((project, i) => (
            <li key={i}>
              <Project
                project={project}
                useFadeInViewOptions={{ skip: i === 0 || !intro }}
              />
            </li>
          ))}
        </ul>
      </div>
    </Component>
  );
}
