import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import useTitle from '../hooks/useTitle';

export default function RootRoute() {
  return (
    <>
      <Helmet>
        <html lang="en" className="bg-black text-white" />
        <title>{useTitle()}</title>
      </Helmet>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
