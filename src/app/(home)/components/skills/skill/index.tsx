import Icon from '@/components/icon';
import { SkillCategoryType, SkillType } from '@/content/skills';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';

export interface SkillProps extends ComponentProps<'span'> {
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
        'inline-flex items-center gap-1 py-1 px-2 rounded-md bg-theme-blue-100 dark:bg-theme-blue-600 hover:bg-theme-blue-150 dark:hover:bg-theme-blue-400 dark:text-theme-gray-200 hover:scale-115 hover:brightness-100 group-hover:brightness-50 transition-all duration-200',
        className,
      )}
      {...props}
    >
      {icon && <Icon icon={icon} className="h-3 md:h-4 w-auto" />}
      <span className="text-xs md:text-sm font-bold">
        {t(`skills.${key}.title`)}
      </span>
    </span>
  );
}
