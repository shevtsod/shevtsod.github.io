import classNames from 'classnames';

export interface ContactProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Contact({ className, ...props }: ContactProps) {
  return <div {...props} className={classNames(className)} />;
}
