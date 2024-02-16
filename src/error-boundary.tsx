import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
  const error = useRouteError();

  let message = 'Unexpected Error';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = 'Not Found';
    } else {
      message = error.data?.message;
    }
  }

  return <div>{message}</div>;
}
