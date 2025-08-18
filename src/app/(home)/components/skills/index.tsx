'use client';

import skillCategories from '@/content/skills';
import useFadeInView from '@/hooks/use-fade-in-view';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import Heading from '../heading';
import Skill from './skill';

export type SkillsProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Renders the skills section.
 */
export default function Skills<T extends ElementType>({
  as,
  className,
  ...props
}: SkillsProps<T>) {
  const Component = as ?? 'div';
  const t = useTranslations('app.(home).components.skills');
  const ref = useRef(null);
  useFadeInView(ref, { once: true });

  return (
    <Component ref={ref} {...props} className={classNames('py-8', className)}>
      <div className="container max-w-3xl mx-auto px-8">
        <Heading
          as="h2"
          className="uppercase text-center mb-8"
          href={`#${props.id}`}
        >
          {t('title')}
        </Heading>

        <ul className="text-center flex flex-col gap-4">
          {skillCategories.map((skillCategory, i) => (
            <li key={i}>
              <div
                id={skillCategory.key}
                className="pb-2 font-retro font-bold text-4xl text-theme-orange-600 dark:text-theme-orange-200 scroll-mt-20"
              >
                {t(`skillCategories.${skillCategory.key}.title`)}
              </div>
              <ul className="flex justify-center gap-4 flex-wrap">
                {skillCategory.skills.map((skill, i) => (
                  <li key={i}>
                    <Skill skill={skill} skillCategory={skillCategory} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Component>
  );
}
