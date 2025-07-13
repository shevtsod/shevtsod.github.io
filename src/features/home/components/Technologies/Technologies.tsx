import { type ComponentPropsWithoutRef, type ElementType } from 'react';

export type TechnologiesProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export default function Technologies<T extends ElementType>({
  as,
  ...props
}: TechnologiesProps<T>) {
  const Component = as ?? 'div';

  return <Component {...props} />;
}
