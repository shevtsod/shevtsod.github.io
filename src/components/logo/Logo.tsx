import classNames from 'classnames';
import { useEffect, useState } from 'react';
import logoInIcon from '../../assets/images/logo-in.webp';
import logoRotateIcon from '../../assets/images/logo-rotate.gif';
import logoIcon from '../../assets/images/logo.webp';

const DURATION_ROTATE = 3.4;

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  shown?: boolean;
  animated?: boolean;
}

export default function Logo({
  shown = true,
  animated,
  className,
  ...props
}: LogoProps) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (shown) {
      setSrc(animated ? logoInIcon : logoIcon);
    } else {
      setSrc('');
    }
  }, [shown, animated]);

  // Logo animation
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    let timeout: NodeJS.Timeout | undefined = undefined;

    if (animated) {
      interval = setInterval(() => {
        setSrc(logoRotateIcon);

        timeout = setTimeout(() => {
          setSrc(logoIcon);
        }, DURATION_ROTATE * 1000);
      }, 3 * DURATION_ROTATE * 1000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [shown, animated]);

  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      className={classNames('image-pixelated', className)}
      {...props}
    />
  );
}
