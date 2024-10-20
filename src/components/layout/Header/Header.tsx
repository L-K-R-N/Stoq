import cl from './Header.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '../Menu/Menu';
import { ThemeSwitcher } from '@/components/UI/ThemeSwitcher/ThemeSwitcher';
import logo from './assets/logo.svg';
interface Props {}

export const Header: React.FC<Props> = () => {
   const headerRef = useRef<HTMLDivElement>(null);

   const [offset, setOffset] = useState(0);

   useEffect(() => {
      const handleScroll = () => {
         setOffset(window.pageYOffset);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   const [menuItems] = useState([
      {
         text: 'About',
         to: 'about',
      },
      {
         text: 'Benefits',
         to: 'benefits',
      },
      {
         text: 'Download',
         to: 'download',
      },
      {
         text: 'Feedback',
         to: 'feedback',
      },
   ]);

   return (
      <header
         className={[cl.header, offset > 80 ? cl.unactive : ''].join(' ')}
         ref={headerRef}
      >
         <div className={cl.wrapper}>
            <div className={cl.header__content}>
               <a className={cl.logo}>
                  {/* <Logo /> */}
                  <img src={logo} alt="" />
               </a>

               <Menu items={menuItems} />

               <div className={cl.header__control}>
                  <ThemeSwitcher />
                  <a className={cl.authBtn}>Parteners</a>
               </div>
            </div>
         </div>
      </header>
   );
};
