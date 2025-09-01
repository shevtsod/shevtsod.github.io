import classNames from 'classnames';
import Image from 'next/image';
import { ComponentProps } from 'react';

export interface CodecProps
  extends Omit<ComponentProps<typeof Image>, 'src' | 'alt'> {}

export default function Codec({ className, ...props }: CodecProps) {
  return (
    <Image
      {...props}
      src="/images/ui/codec.gif"
      alt=""
      width={240}
      height={120}
      className={classNames('w-full h-auto image-pixelated', className)}
    />
  );
}
