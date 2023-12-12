import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignUpPage from '../pages/SignUpPage';
import EventInfo from '../pages/EventInfo';
import CreateEventPage from '../pages/CreateEventPage';
import LoginPage from '../pages/LoginPage';

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
    element: <EventInfo></EventInfo>,
  },
  {
    path: '/criar-evento',
    element: <CreateEventPage></CreateEventPage>,
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
]);
