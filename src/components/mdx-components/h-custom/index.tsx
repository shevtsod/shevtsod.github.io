'use client';

import Icon from '@/components/icon';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
} from '@/components/polymorphic-component';
import classNames from 'classnames';
import { atom, useAtom } from 'jotai';
import { useInView } from 'motion/react';
import Link from 'next/link';
import { ElementType, useEffect, useRef } from 'react';

export const activeHAtom = atom(undefined);

export type HCustomProps<T extends ElementType> = {
  onInView: (id: string) => void;
} & PolymorphicComponentProps<T>;

export function HCustom<T extends ElementType>({
  as = 'h1',
  id,
  className,
  onInView,
  ...props
}: HCustomProps<T>) {
  const ref = useRef(null);
  const [, setActiveH] = useAtom(activeHAtom);
  const inView = useInView(ref, { margin: '-10% 0px -90% 0px' });

  useEffect(() => {
    if (inView) {
      setActiveH(id);
      onInView?.(id);
    }
  }, [inView, id, onInView, setActiveH]);

  return (
    <Link
      ref={ref}
      href={`#${id}`}
      className={classNames(
        'group flex flex-row items-start gap-1 no-underline text-black! dark:text-white!',
        className,
      )}
    >
      <PolymorphicComponent
        {...props}
        as={as}
        id={id}
        className="scroll-mt-22"
      />
      <Icon
        icon="Link"
        className="w-6 h-auto opacity-0 group-hover:opacity-100 ease-[steps(2,end)] duration-200"
      />
    </Link>
  );
}
