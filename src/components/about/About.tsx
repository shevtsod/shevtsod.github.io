export interface AboutProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  className?: string;
}

export default function About({ ...props }: AboutProps) {
  return <div {...props} />;
}
