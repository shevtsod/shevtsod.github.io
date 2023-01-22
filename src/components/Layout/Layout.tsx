import { Poppins } from '@next/font/google';

type LayoutProps = {
  children: React.ReactElement;
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header></header>
      <main className={poppins.className}>{children}</main>
      <footer></footer>
    </>
  );
}
