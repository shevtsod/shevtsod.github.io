import Skill from '@/app/(home)/components/skills/skill';
import Button from '@/components/button';
import ScrambledText from '@/components/scrambled-text';
import { ProjectType } from '@/content/projects';
import { skillCategories, SkillCategoryType } from '@/content/skills';
import useFadeInView, { UseFadeInViewOptions } from '@/hooks/use-fade-in-view';
import classNames from 'classnames';
import { useInView } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';

export interface ProjectProps {
  project: ProjectType;
  useFadeInViewOptions?: UseFadeInViewOptions;
}

/**
 * Renders one project.
 */
export default function Project({
  project,
  useFadeInViewOptions,
}: ProjectProps) {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isNearMiddle = useInView(ref, { margin: '-50% 0px -50% 0px' });
  const t = useTranslations('app.(home).components.projects.project');
  useFadeInView(ref, { once: true, amount: 'all', ...useFadeInViewOptions });

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
    <div ref={ref} className="relative flex flex-col md:flex-row">
      {/* Grain overlay */}
      <div
        className={classNames(
          `z-1 absolute w-full h-full bg-[url('/images/ui/grain.svg')] bg-repeat bg-size-[256px] brightness-200 dark:brightness-0 opacity-25 dark:opacity-50 transition-opacity ease-[steps(2,end)] duration-200 pointer-events-none`,
          {
            'opacity-0!': isNearMiddle,
          },
        )}
      />

      <div className="relative flex-1 grow flex justify-center px-8 aspect-video">
        {/* Colour overlay */}
        <div
          className={classNames(
            `absolute w-full h-full bg-blend-multiply transition-colors ease-[steps(2,end)] duration-200 pointer-events-none`,
            {
              'bg-theme-red-800/60 backdrop-blur-md lg:backdrop-blur-lg':
                !isNearMiddle,
            },
          )}
        />

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
          'flex-1 self-stretch flex py-8 px-8 from-theme-red-800/60 bg-gradient-to-b md:bg-gradient-to-r from-10% md:from-0% to-50% md:to-40% xl:to-30% to-transparent transition-colors ease-[steps(2,end)] duration-200',
          { 'from-transparent': isNearMiddle },
        )}
      >
        <div className="z-1 self-stretch flex flex-col justify-center gap-4">
          {/* Title */}
          <h3 className="font-bold font-retro text-3xl md:text-4xl xl:text-5xl text-theme-red-600 dark:text-theme-red-200">
            {repository ? (
              <Link
                href={repository.url}
                target="_blank"
                className="text-theme-red-400"
              >
                <ScrambledText>{`${title}`}</ScrambledText>
              </Link>
            ) : (
              `${title}`
            )}
          </h3>

          {/* Skills */}
          {projectSkillCategories && (
            <ul className="flex flex-wrap gap-3 group">
              {projectSkillCategories.map((skillCategory) =>
                skillCategory.skills.map((skill, i) => (
                  <li key={i}>
                    <Link href={{ pathname: '/', hash: `skill:${skill.key}` }}>
                      <Skill skill={skill} skillCategory={skillCategory} />
                    </Link>
                  </li>
                )),
              )}
            </ul>
          )}

          {/* Description */}
          <div className="font-bold text-sm md:text-base">{description}</div>

          {/* Links */}
          <ul className="flex flex-wrap gap-2">
            {links?.map((link, i) => (
              <li key={i}>
                <Button
                  as="a"
                  href={link.url}
                  target="_blank"
                  variant="warn"
                  className="text-center md:text-lg px-2 font-bold"
                >
                  <ScrambledText>{t(`links.${link.key}.title`)}</ScrambledText>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
