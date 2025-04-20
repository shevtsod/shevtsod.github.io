import classNames from 'classnames';
import Footer from '../footer/Footer';
import Header from '../header/Header';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  showHeaderOnScroll?: boolean;
  children?: React.ReactNode;
}

export default function Layout({
  showHeaderOnScroll,
  children,
  className,
  ...props
}: LayoutProps) {
  return (
    <div
      {...props}
      className={classNames('min-h-[100svh] flex flex-col', className)}
    >
      <Header showOnScroll={showHeaderOnScroll} />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </div>
  );
}
