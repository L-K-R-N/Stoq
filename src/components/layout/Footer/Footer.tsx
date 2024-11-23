import cl from './Footer.module.scss';
import { useRef, useState } from 'react';
interface Props {}

export interface INavList {
   name: string;
   items: string[];
}

export const Footer: React.FC<Props> = () => {
   const [navLists] = useState<INavList[]>([
      {
         name: 'NAVIGATION',
         items: ['About', 'Download', 'Agreement', 'Support', 'Pricing'],
      },
      {
         name: 'contacts',
         items: ['+7 (999) 999 99-99', 'example@gmail.com'],
      },
   ]);
   const footerRef = useRef<HTMLDivElement>(null);

   return (
      <footer className={cl.footer} ref={footerRef}>
         <div className={cl.wrapper}>
            <div className={cl.footer__content}>
               <div className={cl.footer__container}>
                  <nav className={cl.footer__nav}>
                     {navLists?.map((list) => (
                        <div
                           className={cl.footer__listContainer}
                           key={list.name}
                        >
                           <h5 className={cl.footer__listName}>{list.name}</h5>
                           <ul className={cl.footer__list}>
                              {list.items?.map((item) => (
                                 <li className={cl.footer__listItem} key={item}>
                                    {item}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </nav>
               </div>
            </div>
         </div>
      </footer>
   );
};
