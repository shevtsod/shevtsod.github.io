import Footer from '../footer/Footer';
import Header from '../header/Header';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  showHeaderOnScroll?: boolean;
  children?: React.ReactNode;
}

export default function Layout({
  showHeaderOnScroll,
  children,
  ...props
}: LayoutProps) {
  return (
    <div {...props} className="min-h-[100svh] flex flex-col">
      <Header showOnScroll={showHeaderOnScroll} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
