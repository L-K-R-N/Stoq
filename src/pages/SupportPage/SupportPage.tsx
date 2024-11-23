import { images } from '@/constants';
import cl from './SupportPage.module.scss';
import { SupportForm } from '@/components/layout/SupportForm/SupportForm';

interface Props {}

const SupportPage: React.FC<Props> = () => {
   return (
      <div className={cl.page}>
         <div className={cl.wrapper}>
            <div className={cl.pageContent}>
               <div className={cl.form}>
                  <div className={cl.titles}>
                     <h2 className={cl.title}>Describe your problem</h2>
                     <h3 className={cl.subtitle}>
                        And we will help you find a solution.
                     </h3>
                  </div>
                  <div className={cl.form__container}>
                     <SupportForm />
                  </div>
               </div>
               <div className={cl.mockup}>
                  <img
                     src={images.mockup}
                     alt=""
                     className={cl.mockup__image}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default SupportPage;
