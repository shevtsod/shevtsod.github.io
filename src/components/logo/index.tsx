import logoInIcon from '@/../public/images/ui/logo-in.webp';
import logoRotateIcon from '@/../public/images/ui/logo-rotate.gif';
import logoIcon from '@/../public/images/ui/logo.webp';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

const DURATION_ROTATE = 3.4;

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  shown?: boolean;
  animated?: boolean;
}

/**
 * Renders a logo that can optionally be animated.
 */
export default function Logo({
  shown = true,
  animated,
  className,
  ...props
}: LogoProps) {
  const [src, setSrc] = useState<string | null>(null);
  const lastSrcRef = useRef<string | null>(null);

  // Sets a new src by fetching the image at the given URL
  // This is a cache-busting mechanism to generate a dynamic "blob:..." src URL
  // for the image. It forces GIFs to replay without consuming additional network
  // traffic like a traditional query parameter would.
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
    setSrcFromUrl(animated ? logoInIcon.src : logoIcon.src);
  }, [shown, animated]);

  // Animate the logo every few seconds
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    let timeout: NodeJS.Timeout | undefined;

    if (animated) {
      interval = setInterval(
        () => {
          setSrcFromUrl(logoRotateIcon.src);

          timeout = setTimeout(() => {
            setSrcFromUrl(logoIcon.src);
          }, DURATION_ROTATE * 1000);
        },
        3 * DURATION_ROTATE * 1000,
      );
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
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        height={32}
        width={32}
        alt="Logo"
        className={classNames('image-pixelated', className)}
        {...props}
      />
    )
  );
}
