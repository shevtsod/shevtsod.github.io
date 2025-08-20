import * as Icons from '@/content/icons';
import classNames from 'classnames';
import React, { Suspense } from 'react';
import styles from './icon.module.css';

export type IconKey = keyof typeof Icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconKey;
  viewBox?: string;
}

/**
 * Dynamically imports an SVG icon as a React component using SVGR for full styling
 * control (e.g., change SVG colour, adjust viewBox, etc.)
 */
export default function Icon({
  icon,
  className,
  viewBox = '0 0 16 16',
  ...props
}: IconProps) {
  const Component = Icons[icon];

  return (
    <Suspense>
      <Component
        className={classNames(styles.icon, className)}
        viewBox={viewBox}
        {...props}
      />
    </Suspense>
  );
}
