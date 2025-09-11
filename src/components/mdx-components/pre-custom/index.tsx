import Icon, { IconKey } from '@/components/icon';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import CopyButton from './copy-button';

const languageIconMap: Map<string, { icon: IconKey; className?: string }> =
  new Map([
    ['sh', { icon: 'Bash', className: 'bg-black' }],
    ['bash', { icon: 'Bash', className: 'bg-black' }],
    ['shell', { icon: 'Bash', className: 'bg-black' }],
    ['code', { icon: 'Code', className: 'bg-zinc-700' }],
    ['html', { icon: 'Html', className: 'bg-orange-800' }],
    ['js', { icon: 'Javascript', className: 'bg-yellow-800' }],
    ['typescript', { icon: 'Typescript', className: 'bg-theme-blue-400' }],
    ['tsx', { icon: 'Typescript', className: 'bg-theme-blue-400' }],
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
    <div className="relative pt-5 rounded-lg">
      <pre className={className} {...props}>
        {children}
        <div
          className={classNames(
            'absolute top-0 left-0 w-full h-6.5 px-1.5 flex justify-start items-center text-white rounded-t-lg',
            iconClassName,
          )}
          title={language}
        >
          <Icon icon={icon} className="w-4 h-auto" />
        </div>
        <CopyButton className="absolute top-0 right-0 z-1 w-6.5 h-6.5 flex justify-center items-center text-white rounded-tr-lg" />
      </pre>
    </div>
  );
}
