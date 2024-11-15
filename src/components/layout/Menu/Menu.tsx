import cl from './Menu.module.scss';
import { FC, useEffect, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCloseOutline } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { texts } from '@/constants';
interface Props {
   items: IMenuItem[];
}

interface IMenuItem {
   to: string;
   text: string;
}

export const Menu: FC<Props> = ({ items }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [offset, setOffset] = useState(0);
   const location = useLocation();

   // Функция для определения, является ли ссылка активной
   const isActiveLink = (path: string) => {
      return location.pathname === path;
   };

   useEffect(() => {
      const handleScroll = () => {
         setOffset(window.pageYOffset);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);
   return (
      <div
         className={[cl.menuContainer, offset > 80 ? cl.unactive : ''].join(
            ' ',
         )}
      >
         <button
            title="Toggle menu"
            className={cl.menuBurger}
            onClick={() => setIsOpen(!isOpen)}
         >
            {isOpen ? <IoCloseOutline /> : <RxHamburgerMenu />}
         </button>
         <nav className={[cl.menu, isOpen ? cl.active : ''].join(' ')}>
            <ul className={cl.list}>
               {items?.map((item, index) => (
                  <li key={index} className={cl.listItem}>
                     <Link
                        to={texts.BASE_URL + item.to}
                        className={[
                           cl.link,
                           isActiveLink(texts.BASE_URL + item.to)
                              ? cl.activeLink
                              : '',
                        ].join(' ')}
                        onClick={() => setIsOpen(!isOpen)}
                     >
                        {item.text}
                     </Link>
                  </li>
               ))}
            </ul>
         </nav>
      </div>
   );
};
