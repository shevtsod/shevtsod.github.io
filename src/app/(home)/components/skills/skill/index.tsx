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
    <span
      className={classNames(
        'inline-flex items-center gap-1 py-1 px-2 rounded-md bg-theme-blue-100 dark:bg-theme-blue-600 hover:bg-theme-blue-150 dark:hover:bg-theme-blue-400 dark:text-theme-gray-200 hover:scale-115 transition-all ease-[steps(2,end)] duration-200',
        className,
      )}
      {...props}
    >
      {icon && <Icon icon={icon} className="h-[16px] w-auto" />}
      <span className="text-sm font-bold">{t(`skills.${key}.title`)}</span>
    </span>
  );
}
