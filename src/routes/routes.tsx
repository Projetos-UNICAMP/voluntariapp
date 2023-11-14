import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignUpPage from '../pages/SignUpPage';
import EventInfo from '../pages/EventInfo';

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
    path: '/event-info',
    element: <EventInfo></EventInfo>
  },
]);
