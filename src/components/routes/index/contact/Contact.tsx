import { ComponentPropsWithoutRef, ElementType } from 'react';

export type ContactProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export default function Contact<T extends ElementType>({
  as,
  ...props
}: ContactProps<T>) {
  const Component = as ?? 'div';

  return <Component {...props} />;
}
