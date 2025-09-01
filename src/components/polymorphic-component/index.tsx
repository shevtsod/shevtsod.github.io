import { ComponentPropsWithRef, ElementType } from 'react';

// https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/

// Polymorphic "as" prop
type AsProp<C extends ElementType> = { as?: C };

// Polymorphic component props
export type PolymorphicComponentProps<C extends ElementType> =
  ComponentPropsWithRef<C> & AsProp<C>;

/**
 * A React component with an "as" prop that allows it to render as any
 * user-specified DOM element.
 */
export function PolymorphicComponent<C extends ElementType>({
  as,
  ...props
}: PolymorphicComponentProps<C>) {
  const Component = as ?? 'div';
  return <Component {...props} />;
}
