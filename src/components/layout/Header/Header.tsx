import cl from './Header.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '../Menu/Menu';
import { ThemeSwitcher } from '@/components/UI/ThemeSwitcher/ThemeSwitcher';
import { icons, texts } from '@/constants';
import { Link } from 'react-router-dom';
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
         text: 'Download',
         to: 'download',
      },
      {
         text: 'Agreement',
         to: 'agreement',
      },
      {
         text: 'Support',
         to: 'support',
      },
      {
         text: 'Pricing',
         to: 'pricing',
      },
   ]);

   return (
      <header
         className={[cl.header, offset > 80 ? cl.unactive : ''].join(' ')}
         ref={headerRef}
      >
         <div className={cl.wrapper}>
            <div className={cl.header__content}>
               <Link className={cl.logo} to={texts.BASE_URL}>
                  <img src={icons.logo} alt="" />
               </Link>

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
