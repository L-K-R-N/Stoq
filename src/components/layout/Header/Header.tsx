import cl from './Header.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '../Menu/Menu';
import { Wrapper } from '../Wrapper/Wrapper';
import { ThemeSwitcher } from '@/components/UI/ThemeSwitcher/ThemeSwitcher';
import { Logo } from '@/components/UI/Logo/Logo';
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
         <Wrapper>
            <div className={cl.header__content}>
               <a className={cl.logo}>
                  {/* <img src={logo} alt="logo" className={cl.logo__img} /> */}
                  <Logo />
               </a>

               <Menu items={menuItems} />

               <div className={cl.header__control}>
                  <ThemeSwitcher />
                  <a className={cl.authBtn}>Parteners</a>
               </div>
            </div>
         </Wrapper>
      </header>
   );
};
