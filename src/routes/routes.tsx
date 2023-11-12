import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage></LandingPage>,
  },
]);
