import { DownloadForm } from '@/components/layout/DownloadForm/DownloadForm';
import cl from './DownloadPage.module.scss';
import { images } from '@/constants';
interface Props {}

const DownloadPage: React.FC<Props> = () => {
   return (
      <div className={cl.page}>
         <div className={cl.wrapper}>
            <div className={cl.pageContent}>
               <div className={cl.form}>
                  <div className={cl.titles}>
                     <h2 className={cl.title}>Join Our Beta Test </h2>
                     <h3 className={cl.subtitle}>
                        And Help Us Get Even Better!
                     </h3>
                  </div>
                  <div className={cl.form__container}>
                     <DownloadForm />
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

export default DownloadPage;
