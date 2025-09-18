import Icon from '@/components/icon';
import { SkillCategoryType, SkillType } from '@/content/skills';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';

export interface SkillProps extends ComponentProps<'div'> {
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
    <div
      className={classNames(
        'relative w-16 2xl:w-20 h-16 2xl:h-20 flex flex-col justify-between items-center gap-1 p-1 bg-theme-blue-100 dark:bg-theme-blue-600 hover:bg-theme-blue-150 dark:hover:bg-theme-blue-400 dark:text-theme-gray-200 hover:scale-115 hover:brightness-100 group-hover:brightness-50 transition-all duration-400 hover:duration-100 hover:z-1',
        className,
      )}
      {...props}
    >
      {icon && <Icon icon={icon} className="flex-1 w-full h-8 2xl:h-10 pt-1" />}
      <div className="text-[0.625rem] 2xl:text-xs leading-none font-bold text-center">
        {t(`skills.${key}.title`)}
      </div>
    </div>
  );
}
