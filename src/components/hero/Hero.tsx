import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import ArrowDownIcon from '../../assets/images/icons/arrow-down.svg?react';
import Typewriter from '../typewriter/Typewriter';
import styles from './Hero.module.css';

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Hero({ className, ...props }: HeroProps) {
  const { t } = useTranslation('app', { keyPrefix: 'components.Hero' });

  return (
    <div
      {...props}
      className={classNames(
        'py-10 relative flex flex-col justify-center text-center overflow-hidden bg-theme-gray-800 text-theme-gray-100',
        className,
      )}
    >
      <Title />
      <h2 className="lg:text-lg">
        <Typewriter text={t('subtitle')} duration={2} delay={3.5} />
      </h2>

      <div
        className={classNames(
          'absolute bottom-0 right-0 mx-10 my-10 flex flex-col items-center opacity-0',
          styles.chevron,
        )}
      >
        <span className="font-retro">SCROLL</span>
        <div className="h-[32px] w-[32px]">
          <ArrowDownIcon width={32} height={32} viewBox="0 0 16 16" />
        </div>
      </div>
    </div>
  );
}

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function Title({ className, ...props }: TitleProps) {
  const { t } = useTranslation('app', { keyPrefix: 'components.Hero' });

  return (
    <h1
      {...props}
      className={classNames(
        'my-20 text-[5em] sm:text-[10em] md:text-[12em] lg:text-[16em] xl:text-[20em] [transform:perspective(400px)_rotateX(45deg)] sm:[transform:perspective(800px)_rotateX(45deg)] leading-[0.75] whitespace-break-spaces text-theme-red-400 font-retro [text-shadow:0_0.03em_0_theme("textColor.theme.red.800")]',
        styles.title,
        className,
      )}
    >
      {t('title')}
    </h1>
  );
}
