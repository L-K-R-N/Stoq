import cl from './Layout.module.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

interface Props {}

export const Layout: React.FC<Props> = () => {
   return (
      <>
         <Header />
         <main className={cl.main}>
            <Suspense>
               <Outlet />
            </Suspense>
         </main>
         <Footer />
      </>
   );
};
