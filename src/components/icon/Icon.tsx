import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
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
  const [Component, setComponent] = useState<React.ElementType | null>(null);

  useEffect(() => {
    setComponent(
      React.lazy(() => import(`../../assets/images/icons/${icon}.svg?react`)),
    );
    return () => setComponent(null);
  }, [icon]);

  if (!Component) {
    return null;
  }

  return (
    <Component
      className={classNames(styles.icon, className)}
      viewBox={viewBox}
      {...props}
    />
  );
}
