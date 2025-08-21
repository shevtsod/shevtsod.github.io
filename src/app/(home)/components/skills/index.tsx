'use client';

import { skillCategories } from '@/content/skills';
import useFadeInView from '@/hooks/use-fade-in-view';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
} from 'react';
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
  const [intro, setIntro] = useState(true);
  useFadeInView(ref, { once: true, skip: !intro });

  useEffect(() => {
    setIntro(!window.location.hash);
  }, []);

  return (
    <Component ref={ref} {...props} className={classNames('py-10', className)}>
      <div className="container mx-auto px-2">
        <Heading
          as="h2"
          className="uppercase text-center mb-6"
          href={`#${props.id}`}
        >
          {t('title')}
        </Heading>

        <ul className="flex flex-row flex-wrap justify-center gap-2 md:gap-8">
          {skillCategories.map((skillCategory, i) => (
            <li key={i} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <h3
                id={`skillCategory:${skillCategory.key}`}
                className="m-2 text-center font-retro font-bold text-2xl md:text-4xl text-theme-orange-600 dark:text-theme-orange-200 scroll-mt-20"
              >
                {t(`skillCategories.${skillCategory.key}.title`)}
              </h3>

              <ul className="flex justify-center flex-wrap gap-2 md:gap-4 group">
                {skillCategory.skills.map((skill, i) => (
                  <li key={i}>
                    <Skill
                      skill={skill}
                      skillCategory={skillCategory}
                      id={`skill:${skill.key}`}
                      className="scroll-mt-30"
                    />
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
