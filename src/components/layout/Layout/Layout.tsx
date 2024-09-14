import cl from './Layout.module.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ReactNode } from 'react';

interface Props {
   children: ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
   return (
      <>
         <Header />
         <main className={cl.main}>{children}</main>
         <Footer />
      </>
   );
};
