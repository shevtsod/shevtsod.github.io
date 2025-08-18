import Icon from '@/components/icon';
import { SkillCategoryType, SkillType } from '@/content/skills';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { HTMLAttributes } from 'react';

export interface SkillProps extends HTMLAttributes<HTMLAnchorElement> {
  skill: SkillType;
  skillCategory: SkillCategoryType;
}

export default function Skill({
  skill,
  skillCategory,
  className,
  ...props
}: SkillProps) {
  const { key, icon } = skill;
  const t = useTranslations(
    `app.(home).components.skills.skillCategories.${skillCategory.key}`,
  );

  return (
    <a
      href={`#${skillCategory.key}`}
      className={classNames(
        'inline-block py-1 px-2 text-md font-bold rounded-md bg-theme-blue-100 dark:bg-theme-blue-600 hover:bg-theme-blue-150 dark:hover:bg-theme-blue-400 dark:text-theme-gray-200 hover:scale-115 transition-all ease-[steps(2,end)] duration-200',
        className,
      )}
      {...props}
    >
      <div className="flex gap-1">
        {icon && <Icon icon={icon} className="w-[16px] h-auto" />}
        <span>{t(`skills.${key}.title`)}</span>
      </div>
    </a>
  );
}
