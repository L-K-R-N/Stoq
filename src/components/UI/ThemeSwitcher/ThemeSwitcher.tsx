import { useAppSelector } from '@/hooks/useAppSelector';
import cl from './ThemeSwitcher.module.scss';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setTheme } from '@/store/reducers/SettingsSlice';
export const ThemeSwitcher = () => {
   const { theme } = useAppSelector((state) => state.SettingsReducer);
   const dispatch = useAppDispatch();

   const handleSwitch = () => {
      dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
      document.documentElement.setAttribute('data-theme', theme);
   };
   return (
      <div className={cl.toggleWrapper}>
         <input
            type="checkbox"
            className={cl.dn}
            id="dn"
            checked={theme === 'light'}
            onChange={handleSwitch}
         />
         <label htmlFor="dn" className={cl.toggle}>
            <span className={cl.toggle__handler}>
               <span className={[cl.crater, cl.crater__1].join(' ')}></span>
               <span className={[cl.crater, cl.crater__2].join(' ')}></span>
               <span className={[cl.crater, cl.crater__3].join(' ')}></span>
            </span>
            <span className={[cl.star, cl.star__1].join(' ')}></span>
            <span className={[cl.star, cl.star__2].join(' ')}></span>
            <span className={[cl.star, cl.star__3].join(' ')}></span>
            <span className={[cl.star, cl.star__4].join(' ')}></span>
            <span className={[cl.star, cl.star__5].join(' ')}></span>
            <span className={[cl.star, cl.star__6].join(' ')}></span>
         </label>
      </div>
   );
};
