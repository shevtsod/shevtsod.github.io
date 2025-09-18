import Skill from '@/app/(home)/components/skills/skill';
import Button from '@/components/button';
import ScrambledText from '@/components/scrambled-text';
import Typewriter from '@/components/typewriter';
import { ProjectType } from '@/content/projects';
import { skillCategories, SkillCategoryType } from '@/content/skills';
import useFadeInView, { UseFadeInViewOptions } from '@/hooks/use-fade-in-view';
import { useIntro } from '@/hooks/use-intro';
import classNames from 'classnames';
import { useInView } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';

export interface ProjectProps {
  project: ProjectType;
  useFadeInViewOptions?: UseFadeInViewOptions;
  flip?: boolean;
}

/**
 * Renders one project.
 */
export default function Project({
  project,
  useFadeInViewOptions,
  flip,
}: ProjectProps) {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useFadeInView(ref, { once: true, ...useFadeInViewOptions });
  const isNearMiddle = useInView(ref, { margin: '-50% 0px -50% 0px' });
  const isNearMiddleOnce = useInView(ref, {
    margin: '-50% 0px -50% 0px',
    once: true,
  });
  const t = useTranslations('app.(home).components.projects.project');
  const [intro] = useIntro();

  const { title, description, skills: skillKeys, promo, links } = project;
  const repository = links?.find((p) => p.key === 'repository');
  const projectSkillCategories: SkillCategoryType[] = useMemo(
    () =>
      skillCategories
        .map((sc) => ({
          ...sc,
          skills: sc.skills.filter((s) => skillKeys?.includes(s.key)),
        }))
        .filter((sc) => sc.skills.length),
    [skillKeys],
  );

  // Pause videos when not in focus
  useEffect(() => {
    if (videoRef.current) {
      if (isNearMiddle) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isNearMiddle]);

  return (
    <div
      ref={ref}
      className={classNames('relative flex flex-col', {
        'md:flex-row': !flip,
        'md:flex-row-reverse': flip,
      })}
    >
      {/* Colour overlay */}
      <div
        className={classNames(
          `z-1 absolute w-full h-full bg-linear-to-b from-40% to-80% from-theme-red-800/60 to-transparent backdrop-blur-md lg:backdrop-blur-lg bg-blend-multiply transition-opacity duration-300 pointer-events-none`,
          { 'opacity-0': isNearMiddle },
          { 'md:bg-linear-to-r': !flip, 'md:bg-linear-to-l': flip },
        )}
      />

      {/* Grain overlay */}
      <div
        className={classNames(
          `z-1 absolute w-full h-full bg-[url('/images/ui/grain.svg')] bg-repeat bg-size-[256px] brightness-200 dark:brightness-0 transition-opacity  duration-300 pointer-events-none`,
          { 'opacity-0': isNearMiddle },
          { 'opacity-10 dark:opacity-30': !isNearMiddle },
        )}
      />

      <div className="relative flex-1 grow flex justify-center px-8 aspect-video">
        {promo.type === 'video' && (
          <video
            ref={videoRef}
            height={1280}
            width={720}
            autoPlay
            muted
            loop
            playsInline
            tabIndex={-1}
            aria-hidden="true"
            className="w-auto h-full"
          >
            <source src={promo.path} type="video/mp4" />
          </video>
        )}

        {promo.type === 'image' && (
          <Image
            src={promo.path}
            alt={title}
            height={1280}
            width={720}
            className="w-auto h-full"
          />
        )}
      </div>

      <div
        className={classNames(
          'flex-1 self-stretch justify-center flex p-8 md:p-12',
        )}
      >
        <div className="z-1 xl:max-w-2xl self-stretch flex flex-col justify-around gap-4">
          <div className="flex-3 flex flex-col gap-4 justify-end">
            {/* Title */}
            <h3 className="font-bold font-retro text-3xl md:text-4xl xl:text-5xl text-theme-red-600 dark:text-theme-red-200">
              {repository ? (
                <Link
                  href={repository.url}
                  target="_blank"
                  className="text-theme-red-400"
                >
                  {`${title}`}
                </Link>
              ) : (
                `${title}`
              )}
            </h3>

            {/* Skills */}
            {projectSkillCategories.length && (
              <ul className={classNames('flex flex-wrap gap-1 group')}>
                {projectSkillCategories.map((skillCategory) =>
                  skillCategory.skills.map((skill, i) => (
                    <li key={i}>
                      <Link
                        href={{
                          pathname: '/',
                          hash: `skillCategory:${skillCategory.key}`,
                        }}
                        replace
                      >
                        <Skill skill={skill} skillCategory={skillCategory} />
                      </Link>
                    </li>
                  )),
                )}
              </ul>
            )}

            {/* Links */}
            {links?.length && (
              <ul className={classNames('flex flex-wrap gap-1')}>
                {links?.map((link, i) => (
                  <li key={i} className="flex">
                    <Button
                      as="a"
                      href={link.url}
                      target="_blank"
                      variant="warn"
                      className="text-center md:text-lg font-bold"
                    >
                      <ScrambledText className="block px-1">
                        {t(`links.${link.key}.title`)}
                      </ScrambledText>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex-2">
            {/* Description */}
            <Typewriter
              interval={intro === false ? 0 : 30}
              play={isNearMiddleOnce}
              delay={200}
              className="font-bold text-sm md:text-base"
            >
              {description}
            </Typewriter>
          </div>
        </div>
      </div>
    </div>
  );
}
