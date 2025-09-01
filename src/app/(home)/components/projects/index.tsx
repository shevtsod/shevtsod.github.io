'use client';

import {
  PolymorphicComponent,
  PolymorphicComponentProps,
} from '@/components/polymorphic-component';
import projects from '@/content/projects';
import { useIntro } from '@/hooks/use-intro';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { type ElementType } from 'react';
import Heading from '../heading';
import Project from './project';

export type ProjectsProps<T extends ElementType> = PolymorphicComponentProps<T>;

/**
 * Renders the projects section.
 */
export default function Projects<T extends ElementType>({
  as,
  className,
  ...props
}: ProjectsProps<T>) {
  const t = useTranslations('app.(home).components.projects');
  const [intro] = useIntro();

  return (
    <PolymorphicComponent
      {...props}
      as={as}
      className={classNames('pt-6', className)}
    >
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
    </PolymorphicComponent>
  );
}
