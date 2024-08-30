import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import PrivateRoute from './components/private-route'; // Adjust the path as needed

// Lazy-loaded pages
export const IndexPage = lazy(() => import('src/pages/app'));
export const CalendarPage = lazy(() => import('src/pages/calendar'));
export const MediaPage = lazy(() => import('src/pages/media'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignupPage = lazy(() => import('src/pages/signup'));
export const LogoutPage = lazy(() => import('src/pages/logout'));
export const AddAccounts = lazy(() => import('src/pages/accounts'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ScheduledPage = lazy(() => import('src/pages/scheduled_failed'));
export const FaceBookPageConnection = lazy(() => import('src/pages/accountsConnection/facebookPageConnection'));
export const FaceBookGroupConnection = lazy(() => import('src/pages/accountsConnection/facebookGroupConnection'));
export const InstagramConnection = lazy(() => import('src/pages/accountsConnection/instagram'));
export const LinkedInConnection = lazy(() => import('src/pages/accountsConnection/linkedin'));
export const TikTokConnection = lazy(() => import('src/pages/accountsConnection/tiktok'));
export const YoutubeConnection = lazy(() => import('src/pages/accountsConnection/youtube'));
export const TikTokPostUploadPage = lazy(() => import('src/pages/tikTokPostUpload'));
export const LoaderCheckPage = lazy(() => import('src/sections/loaderCheck/index'));

//  social auth
export const GoogleAuthPage = lazy(() => import('src/pages/socialAuth/google'));
export const FacebookAuthPage = lazy(() => import('src/pages/socialAuth/facebook'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: '/', element: <PrivateRoute element={<IndexPage />} /> },
        { path: 'user', element: <PrivateRoute element={<UserPage />} /> },
        { path: 'accounts', element: <PrivateRoute element={<AddAccounts />} /> },
        { path: 'posts', element: <PrivateRoute element={<ProductsPage />} /> },
        { path: 'posts/scheduled-failed', element: <PrivateRoute element={<ScheduledPage />} /> },
        { path: 'calendar', element: <PrivateRoute element={<CalendarPage />} /> },
        { path: 'media', element: <PrivateRoute element={<MediaPage />} /> },
        { path: 'profile', element: <PrivateRoute element={<ProfilePage />} /> },
        {
          path: 'tiktok/postupload/:platform/:account_id',
          element: <TikTokPostUploadPage />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      path: 'google/auth',
      element: <GoogleAuthPage />,
    },
    {
      path: 'facebook/auth',
      element: <FacebookAuthPage />,
    },
    //  accounts connection
    {
      path: 'connection/facebook/page',
      element: <FaceBookPageConnection />,
    },
    {
      path: 'connection/facebook/group',
      element: <FaceBookGroupConnection />,
    },
    {
      path: 'connection/instagram',
      element: <InstagramConnection />,
    },
    {
      path: 'connection/linkedin',
      element: <LinkedInConnection />,
    },
    {
      path: 'connection/tiktok',
      element: <TikTokConnection />,
    },
    {
      path: 'connection/youtube',
      element: <YoutubeConnection />,
    },
    
    {
      path: 'logout',
      element: <LogoutPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path:'loader-check',
      element:<LoaderCheckPage />,
    }
  ]);

  return routes;
}
