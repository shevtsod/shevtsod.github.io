'use client';

import { experienceCategories } from '@/content/experience';
import useFadeInView from '@/hooks/use-fade-in-view';
import { useIntro } from '@/hooks/use-intro';
import { UTCDate } from '@date-fns/utc';
import classNames from 'classnames';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import Heading from '../heading';

export type ExperienceProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Renders the experience section.
 */
export default function Experience<T extends ElementType>({
  as,
  className,
  ...props
}: ExperienceProps<T>) {
  const Component = as ?? 'div';
  const t = useTranslations('app.(home).components.experience');
  const ref = useRef(null);
  const [intro] = useIntro();
  useFadeInView(ref, { once: true, skip: !intro });

  return (
    <Component ref={ref} {...props} className={classNames('py-10', className)}>
      <div className="container max-w-4xl mx-auto px-8">
        <Heading
          as="h2"
          className="uppercase text-center mb-6"
          href={`#${props.id}`}
        >
          {t('title')}
        </Heading>

        <ul className="flex flex-col justify-center gap-3 md:gap-6">
          {experienceCategories.map((experienceCategory, i) => (
            <li key={i}>
              <h3
                id={`experienceCategory:${experienceCategory.key}`}
                className="m-2 text-center font-retro font-bold text-2xl md:text-4xl text-theme-orange-600 dark:text-theme-orange-200 scroll-mt-22"
              >
                {t(`experienceCategories.${experienceCategory.key}.title`)}
              </h3>

              <ul>
                {experienceCategory.experienceItems.map((experienceItem, i) => (
                  <li key={i} className="group">
                    <div className="flex flex-row gap-8">
                      <div className="flex-1 flex justify-end gap-4">
                        <div className="self-center font-bold text-theme-gray-600 group-hover:text-theme-gray-400 transition-colors">
                          {format(new UTCDate(experienceItem.start), 'y')}
                        </div>

                        <div className="flex flex-col items-center">
                          {/* Line to previous item */}
                          <div
                            className={classNames('grow h-full w-1', {
                              'bg-theme-gray-800 group-hover:bg-theme-gray-600 transition-colors':
                                i > 0 && i,
                            })}
                          />

                          <div className="shrink-0 h-6 w-6 border-6 border-theme-gray-600 group-hover:border-theme-gray-400 transition-colors" />

                          {/* Line to next item */}
                          <div
                            className={classNames('grow h-full w-1', {
                              'bg-theme-gray-800 group-hover:bg-theme-gray-600 transition-colors':
                                i <
                                experienceCategory.experienceItems.length - 1,
                            })}
                          />
                        </div>
                      </div>

                      <div
                        className={classNames('flex-6 basis-0 shrink-0', {
                          'pt-4': i > 0,
                          'pb-4':
                            i < experienceCategory.experienceItems.length - 1,
                        })}
                      >
                        <div className="font-bold font-retro text-xl md:text-2xl text-theme-red-600 dark:text-theme-red-200">
                          {experienceItem.title}
                        </div>

                        <div className="font-bold">
                          {experienceItem.company}
                        </div>

                        <div>{experienceItem.location}</div>

                        <div className="text-theme-gray-400">
                          {format(
                            new UTCDate(experienceItem.start),
                            'MMM. yyyy',
                          )}{' '}
                          →{' '}
                          {experienceItem.end ? (
                            format(new UTCDate(experienceItem.end), 'MMM. yyyy')
                          ) : (
                            <span className="text-theme-orange-600 dark:text-theme-orange-200">
                              {t('experienceItem.end.now')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
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
