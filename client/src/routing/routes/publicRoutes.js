import Home from 'routing/screens/Home';
import Register from 'routing/screens/Register';
import Login from 'routing/screens/Login';

const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/login',
    component: Login,
  },
];

export default publicRoutes;
