import { Helmet } from 'react-helmet';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import useTitle from '../hooks/useTitle';

export default function ErrorRoute() {
  const error = useRouteError();

  let message = 'Unexpected Error';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = 'Not Found';
    } else {
      message = error.data?.message;
    }
  }

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{useTitle('ERROR!')}</title>
      </Helmet>
      <div className="h-screen flex flex-col justify-center text-center bg-black text-white">
        <h1 className="text-9xl font-retro text-primary">ERROR!</h1>
        <p className="text-lg">{message}</p>
      </div>
    </>
  );
}
