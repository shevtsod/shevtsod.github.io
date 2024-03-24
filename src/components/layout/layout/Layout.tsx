import Footer from '../footer/Footer';
import Header from '../header/Header';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function Layout({ children, ...props }: LayoutProps) {
  return (
    <div {...props} className="min-h-[100svh] flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
