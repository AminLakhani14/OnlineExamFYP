import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';
import AdminDashBoard from './AdminDashBoard';

const Analytics = Loadable(lazy(() => import('./dashboard')));
const checkAmin=localStorage.getItem("User");
const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
];

export default dashboardRoutes;
