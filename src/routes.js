import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './components/DashboardComponent/layouts/dashboard';
import SimpleLayout from './layouts/simple';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page200 from './pages/Page200';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import { InvitationPage } from './components/UserPageComponents';
import WorkplacePage from './pages/WorkplacePage';
import { TaskEnforcerPage } from './components/GeneratorTaskEnforcerComponents';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'workplace', element: <WorkplacePage /> },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/InvitationPage/:param1/',
      element: <InvitationPage />,
    },
    {
      path: '/TaskEnforcerPage/:param1/',
      element: <TaskEnforcerPage />,
    },
    {
      path: '/200',
      element: <Page200 />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '/404', element: <Page404 /> },
        { path: '/*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
