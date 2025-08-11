import classNames from 'classnames';
import React, { Suspense, lazy, useMemo } from 'react';
import styles from './icon.module.css';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: string;
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
  const Component = useMemo(
    () => lazy(() => import(`../../../public/images/icons/${icon}.svg`)),
    [icon],
  );

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
