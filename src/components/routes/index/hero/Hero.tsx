import classNames from 'classnames';
import { ComponentPropsWithoutRef, ElementType } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowDownIcon from '../../../../assets/images/icons/arrow-down.svg?react';
import Typewriter from '../../../typewriter/Typewriter';
import styles from './Hero.module.css';

export type HeroProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export default function Hero<T extends ElementType>({
  as,
  className,
  ...props
}: HeroProps<T>) {
  const Component = as ?? 'div';
  const { t } = useTranslation('app', { keyPrefix: 'components.Hero' });

  return (
    <Component
      {...props}
      className={classNames(
        'py-10 relative flex flex-col justify-center text-center overflow-hidden bg-theme-gray-800 text-theme-gray-100',
        className,
      )}
    >
      <h1
        className={classNames(
          'my-20 text-[5em] sm:text-[10em] md:text-[12em] lg:text-[16em] xl:text-[20em] [transform:perspective(400px)_rotateX(45deg)] sm:[transform:perspective(800px)_rotateX(45deg)] leading-[0.75] whitespace-break-spaces text-theme-red-400 font-retro [text-shadow:0_0.03em_0_theme("textColor.theme.red.800")]',
          styles.title,
        )}
      >
        {t('title')}
      </h1>

      <h2 className="lg:text-lg">
        <Typewriter text={t('subtitle')} duration={2} delay={3.5} />
      </h2>

      <div
        className={classNames(
          'absolute bottom-0 right-0 mx-10 my-10 flex flex-col items-center font-retro',
          styles.chevron,
        )}
      >
        <div>SCROLL</div>
        <ArrowDownIcon className="h-[32px] w-auto" viewBox="0 0 16 16" />
      </div>
    </Component>
  );
}
