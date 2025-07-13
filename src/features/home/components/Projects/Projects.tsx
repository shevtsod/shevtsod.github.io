import { type ComponentPropsWithoutRef, type ElementType } from 'react';

export type ProjectsProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export default function Projects<T extends ElementType>({
  as,
  ...props
}: ProjectsProps<T>) {
  const Component = as ?? 'div';

  return <Component {...props} />;
}
