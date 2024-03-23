import classNames from 'classnames';

export interface ProjectsProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Projects({ className, ...props }: ProjectsProps) {
  return <div {...props} className={classNames(className)} />;
}
