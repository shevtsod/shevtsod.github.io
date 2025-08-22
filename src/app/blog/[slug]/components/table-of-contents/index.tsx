import { Toc } from '@stefanprobst/rehype-extract-toc';
import classNames from 'classnames';
import Link from 'next/link';

// https://tailwindcss.com/docs/detecting-classes-in-source-files
const depthMap: Record<number, string> = {
  1: '',
  2: 'px-2',
  3: 'pl-4',
  4: 'pl-6',
  5: 'pl-8',
  6: 'pl-10',
};

export interface TableOfContentsProps {
  tableOfContents: Toc;
  className?: string;
}

export default function TableOfContents({
  tableOfContents,
  className,
}: TableOfContentsProps) {
  return (
    <div className={classNames('flex flex-col', className)}>
      {tableOfContents.map(({ depth, id, value, children }, i) => (
        <div key={i}>
          <Link href={`#${id}`} className={depthMap[depth]}>
            {value}
          </Link>

          {children && <TableOfContents tableOfContents={children} />}
        </div>
      ))}
    </div>
  );
}
