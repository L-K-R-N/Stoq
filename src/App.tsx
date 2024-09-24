import './styles/main.scss';

import { Layout } from './components/layout/Layout/Layout';
import { MainPage } from './pages/other/MainPage';
import { useLayoutEffect } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import { setTheme, TTheme } from './store/reducers/SettingsSlice';
import { useAppSelector } from './hooks/useAppSelector';
import { Loader } from './components/UI/Loader/Loader';

const App = () => {
   const dispatch = useAppDispatch();
   const { theme } = useAppSelector((state) => state.SettingsReducer);

   useLayoutEffect(() => {
      const lastTheme = localStorage.getItem('theme');
      dispatch(setTheme(lastTheme ? (lastTheme as TTheme) : 'dark'));

      localStorage.setItem('theme', lastTheme ? lastTheme : 'dark');
      document.documentElement.setAttribute('data-theme', theme);
   }, []);
   return (
      <div className="">
         <Layout>
            {/* <MainPage /> */}
            <Loader />
         </Layout>
      </div>
   );
};

export default App;
