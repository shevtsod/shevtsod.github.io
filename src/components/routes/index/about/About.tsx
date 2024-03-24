import { ComponentPropsWithoutRef, ElementType } from 'react';

export type AboutProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export default function About<T extends ElementType>({
  as,
  ...props
}: AboutProps<T>) {
  const Component = as ?? 'div';

  return <Component {...props} />;
}
