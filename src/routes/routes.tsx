import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignUpPage from '../pages/SignUpPage';
import CreateEventPage from '../pages/CreateEventPage';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage></LandingPage>,
  },
  {
    path: '/cadastro',
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: '/criar-evento',
    element: <CreateEventPage></CreateEventPage>,
  },
]);
