import { Toc } from '@stefanprobst/rehype-extract-toc';
import classNames from 'classnames';
import Link from 'next/link';

export interface TableOfContentsProps {
  tableOfContents: Toc;
  className?: string;
}

export default function TableOfContents({
  tableOfContents,
  className,
}: TableOfContentsProps) {
  return (
    <ul className={classNames('flex flex-col', className)}>
      {tableOfContents.map(({ id, value, children }, i) => (
        <li key={i} className="my-0.5!">
          <Link href={`#${id}`} className="text-theme-red-400 font-bold">
            {value}
          </Link>

          {children && (
            <TableOfContents tableOfContents={children} className="ms-4" />
          )}
        </li>
      ))}
    </ul>
  );
}
