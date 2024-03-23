import classNames from 'classnames';

export interface TechnologiesProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function Technologies({
  className,
  ...props
}: TechnologiesProps) {
  return <div {...props} className={classNames(className)} />;
}
