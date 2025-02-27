import React, { useEffect, useContext, Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
// import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import MenuPage from './pages/MenuPage';
// import RatingsPage from './pages/RatingsPage';

import ManagerAddFood from './pages/ManagerAddFood';
// import MyMenuPage from './pages/MyMenuPage';
import FeedBackForm from './pages/FeedBackForm';
import ApiContext from './Context/apiContext';
import ManagerDashboard from './pages/ManagerDashboard';
import ManagerMenuPage from './pages/ManagerMenuPage';
import AnnouncementForm from './pages/Announcement';
import AnalyticsPage from './pages/AnalyticsPage';
import Suggestions from './pages/user/Suggestions';
import SuggestionComments from './pages/user/SuggestionComments';

const MyMenuPage = lazy(() => import('./pages/MyMenuPage'));
const RatingsPage = lazy(() => import('./pages/RatingsPage'));

// ----------------------------------------------------------------------

export default function Router() {
  const context = useContext(ApiContext);
  const { getAllNotificatons } = context;

  useEffect(() => {
    getAllNotificatons();
    navigator.serviceWorker.addEventListener('message', (event) => {
      const message = event.data;
      if (message.type === 'notification') {
        console.log('communication from service worker');
        getAllNotificatons();
      }
    });
  }, []);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        // { path: 'menu', element: <MenuPage /> },
        { path: 'products', element: <ProductsPage /> },
        {
          path: 'ratings',
          element: (
            <Suspense fallback={<h1>The page is loading please wait...</h1>}>
              <RatingsPage />
            </Suspense>
          ),
        },
        { path: 'products', element: <ProductsPage /> },
        { path: 'analytics', element: <AnalyticsPage />},
        { path: 'addfooditem', element: <ManagerAddFood /> },
        { path: 'feedback', element: <FeedBackForm /> },
        { path: 'announcement', element: <AnnouncementForm /> },
        {
          path: 'menuPage',
          element: (
            <Suspense fallback={<h1>The page is loading please wait...</h1>}>
              <MyMenuPage />
            </Suspense>
          ),
        },
        // { path: 'managermenupage', element: <ManagerMenuPage /> },
        { path: 'summary', element: <ManagerDashboard /> },
        { path: 'suggestions', element: <Suggestions /> },
        {
          path: 'suggestions/:suggestionId',
          element: <SuggestionComments />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
