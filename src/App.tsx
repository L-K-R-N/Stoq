import './styles/main.scss';

import { Layout } from './components/layout/Layout/Layout';
import { useLayoutEffect } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import { setTheme, TTheme } from './store/reducers/SettingsSlice';
import { useAppSelector } from './hooks/useAppSelector';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SupportPage } from './pages/SupportPage';
import { PricingPage } from './pages/PricingPage';
import { DownloadPage } from './pages/DownloadPage';
import { AgreementPage } from './pages/AgreementPage';
import { MainPage } from './pages/MainPage';
import { texts } from './constants';
import { ErrorPage } from './pages/ErrorPage';
const router = createBrowserRouter([
   {
      path: texts.BASE_URL,
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
         {
            path: 'about',
            element: <MainPage />,
         },
         {
            path: 'support',
            element: <SupportPage />,
         },
         {
            path: 'pricing',
            element: <PricingPage />,
         },
         {
            path: 'download',
            element: <DownloadPage />,
         },
         {
            path: 'agreement',
            element: <AgreementPage />,
         },
      ],
   },
]);

const App = () => {
   const dispatch = useAppDispatch();
   const { theme } = useAppSelector((state) => state.SettingsReducer);

   useLayoutEffect(() => {
      const lastTheme = localStorage.getItem('theme');
      dispatch(setTheme(lastTheme ? (lastTheme as TTheme) : 'dark'));

      localStorage.setItem('theme', lastTheme ? lastTheme : 'dark');
      document.documentElement.setAttribute('data-theme', theme);

      console.log(window.location.pathname);
      if (window.location.pathname === texts.BASE_URL) {
         window.location.pathname = texts.BASE_URL + 'about';
      }
   }, []);
   return <RouterProvider router={router} />;
};

export default App;
