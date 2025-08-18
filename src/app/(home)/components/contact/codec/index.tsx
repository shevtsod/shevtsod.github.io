import classNames from 'classnames';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

export interface CodecProps extends HTMLAttributes<HTMLImageElement> {}

export default function Codec({ className, ...props }: CodecProps) {
  return (
    <Image
      src="/images/ui/codec.gif"
      alt=""
      width={240}
      height={120}
      {...props}
      className={classNames('w-full h-auto image-pixelated', className)}
    />
  );
}
