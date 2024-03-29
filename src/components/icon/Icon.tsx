import classNames from 'classnames';
import React, { Suspense } from 'react';
import styles from './Icon.module.css';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: string;
  viewBox?: string;
}

export default function Icon({
  icon,
  className,
  viewBox = '0 0 16 16',
  ...props
}: IconProps) {
  const Component = React.lazy(
    () => import(`../../assets/images/icons/${icon}.svg?react`),
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
