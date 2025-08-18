'use client';

import projects from '@/content/projects';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { type ComponentPropsWithoutRef, type ElementType } from 'react';
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

  return (
    <Component {...props} className={classNames('pt-6', className)}>
      <div>
        <Heading
          as="h2"
          className="uppercase text-center mb-8"
          href={`#${props.id}`}
        >
          {t('title')}
        </Heading>

        <ul className="flex flex-col">
          {projects.map((project, i) => (
            <li key={i}>
              <Project project={project} />
            </li>
          ))}
        </ul>
      </div>
    </Component>
  );
}
