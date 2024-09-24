import cl from './MainPage.module.scss';
import { useEffect, useState } from 'react';
import appStore from './assets/appStore.png';
import appGallery from './assets/appGallery.png';
import samsungStore from './assets/samsungStore.png';
import playStore from './assets/playStore.png';
import Slider from 'react-slick';
import 'swiper/swiper-bundle.css';
import { Logo } from '@/components/UI/Logo/Logo';

interface Props {}

const MainPage: React.FC<Props> = () => {
   const [benefits] = useState<{ name: string; desc: string }[]>([
      {
         name: 'Independence',
         desc: 'Be free from having to wait for accounting documents. Inventory data updates in real-time, giving you full control of your situation inst antly.',
      },
      {
         name: 'Instant Access',
         desc: 'Get real-time information about products in any currency.',
      },
      {
         name: 'Ease of Management',
         desc: 'Effortlessly manage your inventory, set reminders, search for products and store documents, all in one place.',
      },
      {
         name: 'Product Classification',
         desc: 'A clear and intuitive system for easy searching and tracking.',
      },
      {
         name: 'Units of Measurement',
         desc: 'Support for all necessary units for precise inventory control.',
      },
      {
         name: 'Logistics',
         desc: 'Full control over the delivery process—track the location of goods in transit and know exactly when they are delivered and handed over.',
      },
      {
         name: 'Flexibility for All',
         desc: "Ideal for business owners, field staff and accountants. Regardless of your industry or your team's location, you’ll always have up-to-date information and complete control.",
      },
   ]);
   const [feedbacks] = useState<
      { name: string; desc: string; photo: string; stars: number }[]
   >([
      {
         photo: '',
         name: 'Independence',
         desc: 'Be free from having to wait for accounting documents. Inventory data updates in real-time, giving you full control of your situation inst antly.',
         stars: 5,
      },
      {
         photo: '',
         name: 'Independence',
         desc: 'Be free from having to wait for accounting documents. Inventory data updates in real-time, giving you full control of your situation inst antly.',
         stars: 5,
      },
      {
         photo: '',
         name: 'Independence',
         desc: 'Be free from having to wait for accounting documents. Inventory data updates in real-time, giving you full control of your situation inst antly.',
         stars: 5,
      },
      {
         photo: '',
         name: 'Independence',
         desc: 'Be free from having to wait for accounting documents. Inventory data updates in real-time, giving you full control of your situation inst antly.',
         stars: 5,
      },
   ]);

   const benefitsSliderSettings = {
      className: 'center',
      centerMode: true,
      autoplay: true,

      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      speed: 500,
   };

   const [windowWidth, setWindowWidth] = useState<number>(1920);

   useEffect(() => {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
         setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Вызываем функцию один раз при монтировании компонента

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);
   return (
      <div className={cl.mainPage}>
         <div className={cl.mainPage__intro} id="intro">
            <div className={cl.mainPage__intro_container}>
               {/* ST<span>O</span>
                  <span>Q</span> */}
               <Logo className={cl.mainPage__title} />
               <p className={cl.mainPage__desc}>
                  Your Reliable Partner in Asset Management.
               </p>
            </div>
            <div className={cl.mainPage__feedback_slider}>
               <Slider
                  {...{
                     ...benefitsSliderSettings,
                     slidesToShow:
                        windowWidth < 500
                           ? 1
                           : windowWidth < 1060
                             ? 2
                             : windowWidth < 1508
                               ? 3
                               : 4,
                     centerMode: !(windowWidth < 400),
                     autoplaySpeed: 10000,
                  }}
               >
                  {feedbacks.map((feedback) => (
                     <div
                        className={cl.mainPage__intro_slide}
                        key={feedback.name}
                     >
                        <div className={cl.mainPage__intro_slideHeader}>
                           {/* <img src={feedback.photo} alt="" /> */}
                           <h4></h4>
                        </div>
                        <p></p>
                     </div>
                  ))}
               </Slider>
            </div>
         </div>

         <div className={cl.mainPage__about} id="about">
            <div className={cl.mainPage__about_content}>
               <div className={cl.left}>
                  <h3 className={cl.mainPage__about_title}>About</h3>

                  <ul className={cl.mainPage__about_list}>
                     <li>
                        <p>
                           <span>Discover STOQ</span> — app is designed for
                           everyone, from households and individuals to
                           entrepreneurs, small businesses, and mid-sized
                           companies across all industries. It is the simplest,
                           lightest, and most user-friendly solution on the
                           market, crafted to meet the diverse needs of a wide
                           range of users
                        </p>
                     </li>
                     <li>
                        <p>
                           Whether you're managing daily household stock,
                           personal stocks, or running a business, our app
                           adapts seamlessly to your workflow. Its intuitive
                           interface ensures ease of use for beginners, while
                           its powerful features provide the flexibility and
                           functionality demanded by businesses of all sizes.
                        </p>
                     </li>
                     <li>
                        <p>
                           No matter your industry or technical expertise, our
                           app offers a streamlined experience, making it the
                           perfect tool for organizing, managing, and tracking
                           stocks efficiently—without the complexity of other
                           solutions. Lightweight and fast, it won't overwhelm
                           your devices or your team, allowing everybody to
                           focus on what matters most.
                        </p>
                     </li>
                     <li>
                        <p>
                           From home life to business operations, our
                           <span> STOQ app</span> empowers users with a
                           hassle-free and versatile tool that grows with you.
                        </p>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className={cl.mainPage__benefits} id="benefits">
            <div className={cl.mainPage__benefits_content}>
               <h3 className={cl.title}>Benefits</h3>
               <div className={cl.mainPage__benefits_slider}>
                  <Slider
                     {...{
                        ...benefitsSliderSettings,
                        slidesToShow:
                           windowWidth < 900 ? 1 : windowWidth < 1400 ? 2 : 3,
                        centerMode: !(windowWidth < 400),
                     }}
                  >
                     {benefits.map((benefit) => (
                        <div
                           className={cl.mainPage__benefits_slide}
                           key={benefit.name}
                        >
                           <h4>{benefit.name}</h4>
                           <p>{benefit.desc}</p>
                        </div>
                     ))}
                  </Slider>
               </div>
            </div>
         </div>
         <div className={cl.mainPage__feedback} id="feedback">
            <div className={cl.mainPage__feedback_content}>
               <div className={cl.left}>
                  <h3 className={cl.mainPage__feedback_title}>Feedback</h3>

                  <div className={cl.mainPage__feedback_slider}>
                     <Slider
                        {...{
                           ...benefitsSliderSettings,
                           slidesToShow: windowWidth < 900 ? 1 : 2,
                           centerMode: !(windowWidth < 400),
                           autoplaySpeed: 10000,
                        }}
                     >
                        {feedbacks.map((feedback) => (
                           <div
                              className={cl.mainPage__feedback_slide}
                              key={feedback.name}
                           >
                              <div
                                 className={cl.mainPage__feedback_slideHeader}
                              >
                                 <img src={feedback.photo} alt="" />
                                 <h4>{feedback.name}</h4>
                              </div>
                              <p>{feedback.desc}</p>
                           </div>
                        ))}
                     </Slider>
                  </div>
               </div>
            </div>
         </div>
         <div className={cl.mainPage__download} id="download">
            <div className={cl.mainPage__download_content}>
               <h3 className={cl.title}>Download</h3>
               <ul className={cl.mainPage__download_desc}>
                  <li>
                     <img src={appStore} alt="" />
                     <p>
                        <span>from the</span>
                        App Store
                     </p>
                  </li>
                  <li>
                     <img src={samsungStore} alt="" />
                     <p>
                        <span>from the</span>
                        Galaxy Store
                     </p>
                  </li>
                  <li>
                     <img src={playStore} alt="" />
                     <p>
                        <span>on</span>
                        Google Play
                     </p>
                  </li>
                  <li>
                     <img src={appGallery} alt="" />
                     <p>
                        <span>in the</span>
                        App Gallery
                     </p>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default MainPage;
