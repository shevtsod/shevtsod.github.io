'use client';

import Icon from '@/components/icon';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { ComponentProps, MouseEvent, useEffect, useState } from 'react';

export interface CopyButtonProps extends ComponentProps<'button'> {}

export default function CopyButton({ className, ...props }: CopyButtonProps) {
  const t = useTranslations('components.copy-button');
  const [copied, setCopied] = useState(false);

  const copy = async (event: MouseEvent<HTMLButtonElement>) => {
    const currentTarget = event.currentTarget;
    const sibling = currentTarget.previousSibling;

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(sibling?.textContent ?? '');
      setCopied(true);
    } else {
      console.error('Clipboard API is not supported');
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <button
      className={classNames(
        'cursor-pointer',
        { 'bg-green-600 text-white': copied },
        className,
      )}
      onClick={copy}
      {...props}
      title={t(copied ? 'copied' : 'copy')}
    >
      <Icon icon={copied ? 'Check' : 'Copy'} className="w-4 h-auto" />
    </button>
  );
}
