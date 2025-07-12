import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
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
  const lastSrcRef = useRef<string | null>(null);

  // Sets a new src by fetching the image at the given URL
  function setSrcFromUrl(url: string) {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const newObjectUrl = URL.createObjectURL(blob);

        // Revoke previous src
        if (lastSrcRef.current) {
          URL.revokeObjectURL(lastSrcRef.current);
        }

        lastSrcRef.current = newObjectUrl;
        setSrc(newObjectUrl);
      });
  }

  // Transition into view
  useEffect(() => {
    setSrcFromUrl(animated ? logoInIcon : logoIcon);
  }, [shown, animated]);

  // Animate the logo every few seconds
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    let timeout: NodeJS.Timeout | undefined;

    if (animated) {
      interval = setInterval(() => {
        setSrcFromUrl(logoRotateIcon);

        timeout = setTimeout(() => {
          setSrcFromUrl(logoIcon);
        }, DURATION_ROTATE * 1000);
      }, 3 * DURATION_ROTATE * 1000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);

      if (lastSrcRef.current) {
        URL.revokeObjectURL(lastSrcRef.current);
      }
    };
  }, [shown, animated]);

  if (!src) return null;

  return (
    shown && (
      <img
        src={src}
        className={classNames('image-pixelated', className)}
        {...props}
      />
    )
  );
}
