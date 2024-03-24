import classNames from 'classnames';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

export default function Header({ className, ...props }: HeaderProps) {
  return <header {...props} className={classNames(className)} />;
}
