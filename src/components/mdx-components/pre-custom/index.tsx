import Icon, { IconKey } from '@/components/icon';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import CopyButton from './copy-button';

const languageIconMap: Map<string, { icon: IconKey; className?: string }> =
  new Map([
    ['sh', { icon: 'Bash', className: 'bg-black text-white' }],
    ['bash', { icon: 'Bash', className: 'bg-black text-white' }],
    ['shell', { icon: 'Bash', className: 'bg-black text-white' }],
    ['code', { icon: 'Code', className: 'bg-zinc-700 text-white' }],
    ['html', { icon: 'Html', className: 'bg-orange-800 text-white' }],
    ['js', { icon: 'Javascript', className: 'bg-yellow-500 text-black' }],
    ['markdown', { icon: 'Markdown', className: 'bg-blue-400 text-black' }],
    [
      'typescript',
      { icon: 'Typescript', className: 'bg-theme-blue-700 text-white' },
    ],
    ['tsx', { icon: 'Typescript', className: 'bg-theme-blue-400 text-white' }],
  ]);

export interface PreCustomProps extends ComponentProps<'pre'> {}

export function PreCustom({ children, className, ...props }: PreCustomProps) {
  const classes = className?.split(' ') ?? [];
  const languageClass = classes.find((c) => c.startsWith('language-'));
  const language = languageClass?.slice('language-'.length);
  const { icon, className: iconClassName } =
    language && languageIconMap.has(language)
      ? languageIconMap.get(language)!
      : languageIconMap.get('code')!;

  return (
    <div className={classNames('relative pt-5 rounded-lg', iconClassName)}>
      <pre className={className} {...props}>
        {children}
        <CopyButton
          className={classNames(
            'absolute top-0 right-0 z-1 w-6.5 h-6.5 flex justify-center items-center rounded-tr-lg',
            iconClassName,
          )}
        />
        <div
          className={classNames(
            'absolute top-0 left-0 w-full h-6.5 px-1.5 flex justify-start items-center rounded-t-lg',
            iconClassName,
          )}
          title={language}
        >
          <Icon
            icon={icon}
            className={classNames('w-4 h-auto', iconClassName)}
          />
        </div>
      </pre>
    </div>
  );
}
