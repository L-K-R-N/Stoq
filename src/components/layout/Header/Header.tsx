import cl from './Header.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '../Menu/Menu';
import { Wrapper } from '../Wrapper/Wrapper';
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
         style={{
            background:
               offset > 80
                  ? 'rgba(0, 0, 0, 0.434)'
                  : `rgba(0, 0, 0, ${offset / 200})`,
         }}
         ref={headerRef}
      >
         <Wrapper>
            <div className={cl.header__content}>
               <a className={cl.logo}>
                  <img src={logo} alt="logo" className={cl.logo__img} />
               </a>

               <Menu items={menuItems} />

               <div className={cl.header__control}>
                  <div className={cl.auth__btns}>
                     <a>Parteners access</a>
                  </div>
               </div>
            </div>
         </Wrapper>
      </header>
   );
};
