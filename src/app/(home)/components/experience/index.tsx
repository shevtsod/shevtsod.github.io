'use client';

import { experience } from '@/content/experience';
import useFadeInView from '@/hooks/use-fade-in-view';
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
  useFadeInView(ref, { once: true });

  return (
    <Component
      ref={ref}
      {...props}
      className={classNames('relative pt-8 pb-16', className)}
    >
      <div className="container max-w-4xl mx-auto px-8">
        <Heading
          as="h2"
          className="uppercase text-center mb-8"
          href={`#${props.id}`}
        >
          {t('title')}
        </Heading>

        <ul className="flex flex-col">
          {experience.map((experienceItem, i) => (
            <li key={i} className="group">
              <div className="flex flex-row gap-8">
                <div className="flex-1 flex justify-end">
                  <div className="self-center px-4 font-bold text-theme-gray-600 group-hover:text-theme-gray-400 transition-colors">
                    {format(experienceItem.start, 'y')}
                  </div>
                  <div className="flex flex-col items-center">
                    {/* Line to previous item */}
                    <div
                      className={classNames('grow h-full w-1', {
                        'bg-theme-gray-800 group-hover:bg-theme-gray-400 transition-colors':
                          i > 0,
                      })}
                    />

                    <div className="shrink-0 h-6 w-6 border-6 border-theme-gray-600 group-hover:border-theme-gray-400 transition-colors" />

                    {/* Line to next item */}
                    <div
                      className={classNames('grow h-full w-1', {
                        'bg-theme-gray-800 group-hover:bg-theme-gray-400 transition-colors':
                          i < experience.length - 1,
                      })}
                    />
                  </div>
                </div>

                <div className="flex-6 basis-0 shrink-0 py-8">
                  <div className="font-bold font-retro text-3xl text-theme-red-600 dark:text-theme-red-200">
                    ｢{experienceItem.title}｣
                  </div>
                  <div className="font-bold">{experienceItem.company}</div>
                  <div>{experienceItem.location}</div>
                  <div className="text-theme-gray-400">
                    {format(experienceItem.start, 'PP')} →{' '}
                    {experienceItem.end ? (
                      format(experienceItem.end, 'PP')
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

        <div className="h-[64px] w-full absolute bottom-0 left-0 z-10 image-pixelated bg-repeat-x bg-[length:64px_64px] bg-[url('/images/ui/dither-y-white.svg')] dark:bg-[url('/images/ui/dither-y-black.svg')] rotate-180" />
      </div>
    </Component>
  );
}
