import { RouteObject } from 'react-router-dom';
import Home from '@/pages/home/home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home/>,
  },
];

export default routes;
