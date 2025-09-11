import { activeHAtom } from '@/components/mdx-components/h-custom';
import { Toc } from '@stefanprobst/rehype-extract-toc';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import Link from 'next/link';

export interface TableOfContentsProps {
  tableOfContents: Toc;
  className?: string;
}

export default function TableOfContents({
  tableOfContents,
  className,
}: TableOfContentsProps) {
  const [activeId] = useAtom(activeHAtom);

  return (
    <ul className={classNames('flex flex-col', className)}>
      {tableOfContents.map(({ id, value, children }, i) => (
        <li key={i} className="my-0.5!">
          <Link
            href={`#${id}`}
            className={classNames('font-bold text-theme-red-400', {
              'xl:text-inherit': activeId === id,
            })}
          >
            {value}
          </Link>

          {children && (
            <TableOfContents
              tableOfContents={children}
              className={classNames('ms-4', className)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
