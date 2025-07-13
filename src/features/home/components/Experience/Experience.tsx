import { type ComponentPropsWithoutRef, type ElementType } from 'react';

export type AboutProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export default function Experience<T extends ElementType>({
  as,
  ...props
}: AboutProps<T>) {
  const Component = as ?? 'div';

  return <Component {...props} />;
}
