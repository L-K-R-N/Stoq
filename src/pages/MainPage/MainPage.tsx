import { ReactNode, useEffect, useState } from 'react';
import Slider from 'react-slick';
import cl from './MainPage.module.scss';

import { icons, images, texts } from '@/constants';
import { Link, useNavigate } from 'react-router-dom';

interface Props {}

const MainPage: React.FC<Props> = () => {
   const [dignities] = useState<string[]>([
      'Neat, Minimalist, Laconic',
      'For Service Business and Beyond',
      'For Households, Hobbies and Life',
      'Tailored for Team Collaboration',
      'Sales-Free, Accounting-Free',
   ]);
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
      {
         name: string;
         desc: ReactNode;
         photo: string;
         stars: number;
         date: string;
         role: string;
      }[]
   >([
      {
         photo: images.photo1,
         name: 'Antoine Lefevre',
         desc: (
            <div className={cl.text}>
               <ul>
                  <li>
                     I run a construction company and STOQ has really simplified
                     our operations. No more spreadsheets—every material and
                     piece of equipment is just a few clicks away in the app,
                     which is easy for anyone to use. The tracking feature is a
                     lifesaver, ensuring we always know where our tools are,
                     whether they&#39;re onsite or in another city. It&#39;s
                     time-saving and hassle-free. Plus, the real-time delivery
                     tracking means no more guessing about where our shipments
                     are.
                  </li>
               </ul>
            </div>
         ),
         stars: 5,
         date: 'March 26, 2024',
         role: 'BIM Coordinator',
      },
      {
         photo: images.photo2,
         name: 'Chloé Moreau',
         desc: (
            <div className={cl.text}>
               <ul>
                  <li>
                     I manage a maintenance and installation company, and{' '}
                     <span>STOQ</span> is a game-changer. It organizes materials
                     and tools in one place, streamlines management, and
                     simplifies tracking. The app&#39;s built-in messenger
                     enhances team communication, ensuring operations run
                     smoothly and efficiently.
                  </li>
               </ul>
            </div>
         ),
         stars: 5,
         date: 'January 14, 2024',
         role: 'Structural Engineer',
      },
      {
         photo: images.photo1,
         name: 'Bram Janssen',
         desc: (
            <div className={cl.text}>
               <ul>
                  <li>
                     We recently started using <span>STOQ</span> on our small
                     farm and it&#39;s been transformative. The app effortlessly
                     organizes our seeds, fertilizers, and tools, making
                     inventory management straightforward. The built-in
                     messenger is excellent for quick document and photo
                     sharing, streamlining our operations. Of all the apps
                     we&#39;ve tried, STOQ combines the most useful features
                     into one efficient tool. We&#39;re definitely keeping it.
                  </li>
               </ul>
            </div>
         ),
         stars: 5,
         date: 'February 21, 2024',
         role: 'Construction Site Manager',
      },
      {
         photo: images.photo2,
         name: 'Daan Verhoeven',
         desc: (
            <div className={cl.text}>
               <ul>
                  <li>
                     <span>STOQ</span> has transformed our inventory process. It
                     allows us to handle goods in any unit, monitor real-time
                     stock values, convert prices to different currencies, ideal
                     for working with international suppliers. The simple,
                     intuitive interface doesn&#39;t require extensive training,
                     making it perfect for my team. It&#39;s a really cool tool!
                  </li>
               </ul>
            </div>
         ),
         stars: 5,
         date: 'January 30, 2024',
         role: 'Infrastructure Architect',
      },
      {
         photo: images.photo2,
         name: 'Émile Fontaine',
         desc: (
            <div className={cl.text}>
               <ul>
                  <li>
                     Since implementing <span>STOQ</span> at our clinic,
                     managing medical supplies has become seamless. This app
                     keeps us fully stocked with crucial medications through a
                     few clicks, enabling real-time delivery tracking. Its
                     messaging system and data archiving capabilities are
                     essential for coordinating with suppliers and adhering to
                     healthcare regulations. The intuitive interface saves us
                     time, allowing our staff to focus more on patient care. As
                     a clinic head, I find STOQ invaluable for streamlining
                     operations and maintaining our care standards.
                  </li>
               </ul>
            </div>
         ),
         stars: 5,
         date: 'January 30, 2024',
         role: 'Site Automation Specialist',
      },
      {
         photo: images.photo2,
         name: 'Oliver Bennett',
         desc: (
            <div className={cl.text}>
               <ul>
                  <li>
                     I never expected a casual chat at the nail salon to
                     revolutionize my home management! My manicurist raved about{' '}
                     <span>STOQ</span>. It truly is transformative—not just for
                     businesses but for chaotic home life too. With three kids,
                     keeping track of groceries, medications and household items
                     is a constant struggle. <span>STOQ</span> helps me log
                     everything from band-aids to baking soda, no matter where
                     it&#39;s hidden in the house. It even alerts me days before
                     food expires—no more moldy bread or sour milk surprises.
                     This app is like having a personal assistant in my pocket,
                     helping me manage my bustling home efficiently. It’s so
                     effective, I’m tempted to catalog everything!
                  </li>
               </ul>
            </div>
         ),
         stars: 5,
         date: 'September 15, 2024',
         role: 'Building Energy Consultant',
      },
   ]);
   const navigate = useNavigate();

   const benefitsSliderSettings = {
      centerMode: true,
      autoplay: true,

      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      speed: 500,
      arrows: false,
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
      <div className={cl.page}>
         <div className={cl.intro} id="intro">
            <div className={cl.wrapper}>
               <div className={cl.intro__content}>
                  <div className={cl.intro__content_main}>
                     <div className={cl.intro__content_left}>
                        <svg
                           height="60px"
                           width="100px"
                           viewBox="0 0 202 56"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                           className={cl.intro__title}
                        >
                           <g clipPath="url(#clip0_20_64)">
                              <path
                                 className={cl.letter}
                                 fillRule="evenodd"
                                 clipRule="evenodd"
                                 d="M67.1918 50.9692V10.965H54.3328C47.9106 10.8091 48.1079 1.58862 54.3767 1.43152H90.1862C96.3898 1.99252 95.9102 10.882 90.1423 10.965H77.1545V50.9692C76.9966 56.8205 67.5465 56.7346 67.1918 50.9692Z"
                              />
                              <path
                                 className={[cl.letter, cl.dotO].join(' ')}
                                 fillRule="evenodd"
                                 clipRule="evenodd"
                                 d="M117.934 36.1213C115.394 36.1213 113.303 35.2932 111.656 33.642C110.008 31.9909 109.181 29.8973 109.181 27.3534C109.181 24.8094 110.011 22.7056 111.666 21.0545C113.322 19.4034 115.404 18.5749 117.934 18.5749C120.463 18.5749 122.566 19.4057 124.232 21.0647C125.898 22.7238 126.728 24.8147 126.728 27.3534C126.728 29.8921 125.896 31.9909 124.238 33.642C122.58 35.2932 120.473 36.1213 117.934 36.1213Z"
                              />
                              <path
                                 className={cl.letter}
                                 fillRule="evenodd"
                                 clipRule="evenodd"
                                 d="M2.07034 47.0254C6.09354 50.164 6.13274 50.6416 13.0432 52.9879C19.9536 55.3341 35.895 56.6541 44.1334 50.5126C48.4851 47.3451 50.6835 43.3068 50.7942 38.409C50.9832 34.1023 49.5995 30.4907 46.7258 27.4741C41.2616 21.5964 33.7231 21.2963 26.3159 20.8007C20.3875 20.4546 16.4881 19.8522 14.1912 18.5136C8.97844 14.3137 17.0233 9.88991 22.1653 9.95181C27.3074 10.0137 30.8643 10.9171 34.0368 12.2175C37.2093 13.518 36.0986 13.3002 39.994 16.0619C43.8895 18.8235 51.2362 13.3194 45.6594 7.78433C41.8617 4.96963 39.8526 4.00372 35.6204 2.56392C31.3882 1.12402 27.9205 0.412216 22.763 0.412216C17.6054 0.412216 12.0286 1.73952 8.19934 4.48862C4.37004 7.23772 2.27694 10.7667 2.11804 15.0155C1.80154 20.023 4.22624 24.0113 8.35774 26.6601C10.8378 28.181 15.6071 29.5873 22.4481 30.236C27.6484 31.0647 40.9142 29.6636 40.3723 38.1955C40.1524 44.0653 31.7007 45.7006 27.217 45.6869C18.7744 45.6152 12.7786 42.2973 7.75734 38.6094C2.62074 35.9078 -3.11906 40.948 2.07034 47.0254Z"
                              />
                              <path
                                 className={cl.letter}
                                 fillRule="evenodd"
                                 clipRule="evenodd"
                                 d="M117.895 45.6548C123.322 45.5976 126.912 44.0516 130.1 40.6588C133.287 37.266 134.883 32.7952 134.796 27.3481C134.708 21.9011 133.377 18.2739 129.809 14.7169C126.241 11.16 121.346 10.0644 117.895 10.0208C114.443 9.97711 109.248 11.4364 106.045 14.7169C102.841 17.9975 100.863 21.8883 100.983 27.3481C101.102 32.8079 102.648 37.143 105.759 40.6588C108.87 44.1746 112.467 45.7121 117.895 45.6548ZM117.895 55.2524C109.778 55.34 103.701 52.6899 98.3064 47.4251C92.9118 42.1603 90.6843 35.4892 90.6447 27.3481C90.605 19.207 93.4782 13.0091 98.8144 7.72561C104.15 2.44211 110.241 0.273616 117.895 0.349516C125.548 0.425516 131.441 2.48261 136.931 7.72561C142.421 12.9685 145.056 18.8586 145.129 27.3481C145.202 35.8376 142.849 42.1419 137.316 47.6184C131.784 53.0949 126.011 55.1648 117.895 55.2524Z"
                              />
                              <path
                                 className={cl.letter}
                                 fillRule="evenodd"
                                 clipRule="evenodd"
                                 d="M174.449 45.3649C178.312 45.4437 183.214 43.6913 186.52 40.5309C189.826 37.3706 191.451 32.7717 191.399 27.3481C191.347 21.9246 189.98 18.2739 186.412 14.7169C182.844 11.16 177.95 10.0644 174.498 10.0208C171.046 9.97711 165.852 11.4364 162.648 14.7169C159.445 17.9975 157.457 21.9436 157.586 27.3481C157.715 32.7527 159.36 37.0316 162.41 40.3824C165.461 43.7332 170.587 45.286 174.449 45.3649ZM174.498 55.2524C168.594 55.3184 160.304 52.6899 154.91 47.4251C149.515 42.1603 147.288 35.4892 147.248 27.3481C147.208 19.207 150.081 13.0091 155.418 7.72561C160.754 2.44211 166.844 0.273616 174.498 0.349516C182.151 0.425516 188.044 2.48261 193.534 7.72561C199.024 12.9685 201.678 19.8511 201.732 27.3481C201.787 34.8452 198.489 41.4482 196.855 43.6986C195.221 45.9491 198.478 45.4235 200.076 48.6236C201.674 51.8236 198.011 55.2413 195.091 55.2524C192.172 55.2634 189.616 51.0188 189.616 51.0188C185.455 53.7115 180.402 55.1863 174.498 55.2524Z"
                              />
                              <path
                                 className={[cl.letter, cl.dotQ].join(' ')}
                                 fillRule="evenodd"
                                 clipRule="evenodd"
                                 d="M174.469 36.1213C171.929 36.1213 169.839 35.2932 168.191 33.642C166.544 31.9909 165.717 29.8973 165.717 27.3534C165.717 24.8094 166.546 22.7056 168.202 21.0545C169.857 19.4034 171.94 18.5749 174.469 18.5749C176.998 18.5749 179.102 19.4057 180.768 21.0647C182.434 22.7238 183.263 24.8147 183.263 27.3534C183.263 29.8921 182.431 31.9909 180.773 33.642C179.115 35.2932 177.009 36.1213 174.469 36.1213Z"
                              />
                           </g>
                           <defs>
                              <clipPath id="clip0_20_64">
                                 <rect width="202" height="56" fill="white" />
                              </clipPath>
                           </defs>
                        </svg>
                        <p className={cl.intro__slogan}>
                           <span>Simplify</span> Your Inventory, <br />
                           <span>Amplify</span> Your Success.
                        </p>
                     </div>
                     <div className={cl.intro__content_right}>
                        <button
                           className={cl.intro__btn}
                           onClick={() => navigate(texts.BASE_URL + 'download')}
                        >
                           TRY NOW
                        </button>
                     </div>
                  </div>
                  <ul className={cl.intro__content_dignities}>
                     {dignities.map((dignity) => (
                        <li key={dignity} className={cl.intro__content_dignity}>
                           {dignity}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
            <div className={cl.intro__feedbacks}>
               <Slider
                  {...{
                     ...benefitsSliderSettings,
                     slidesToShow:
                        windowWidth < 900
                           ? 1
                           : windowWidth < 1200
                             ? 3
                             : windowWidth < 1920
                               ? 4
                               : 5,
                     centerMode: !(windowWidth < 400),
                     autoplaySpeed: 4000,
                     className: cl.intro__sliderFirst,
                  }}
               >
                  {feedbacks.map((feedback) => (
                     <div className={cl.intro__slide} key={feedback.name}>
                        <div className={cl.intro__slideHeader}>
                           <img src={feedback.photo} alt="" />
                           <div className={cl.info}>
                              <h4>{feedback.role}</h4>
                              <h6>{feedback.name}</h6>
                           </div>
                        </div>
                        <div className={cl.intro__slideMain}>
                           <p>{feedback.desc}</p>
                           <span className={cl.date}>{feedback.date}</span>
                        </div>
                     </div>
                  ))}
               </Slider>

               {/* <Slider
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
                     autoplaySpeed: 4000,
                     className: cl.intro__sliderSecond,
                     rtl: true,
                  }}
               >
                  {feedbacks.map((feedback) => (
                     <div className={cl.intro__slide} key={feedback.name}>
                        <div className={cl.intro__slideHeader}>
                           <img src={feedback.photo} alt="" />
                           <h4>{feedback.name}</h4>
                        </div>
                        <div className={cl.intro__slideMain}>
                           <p>{feedback.desc}</p>
                           <span>{feedback.date}</span>
                        </div>
                     </div>
                  ))}
               </Slider> */}
            </div>
         </div>

         <div className={cl.about} id="about">
            <div className={cl.wrapper}>
               <div className={cl.about__content}>
                  <h3 className={cl.title}>About</h3>

                  <div className={cl.about__list}>
                     <ul className={cl.about__sublist}>
                        {/* <li className={cl.counter}>1</li> */}
                        <li>
                           <span>Discover STOQ</span> — app is designed for
                           everyone, from households and individuals to
                           entrepreneurs, small businesses, and mid-sized
                           companies across all industries. It is the simplest,
                           lightest, and most user-friendly solution on the
                           market, crafted to meet the diverse needs of a wide
                           range of users
                        </li>
                        <li>
                           Whether you're managing daily household stock,
                           personal stocks, or running a business, our app
                           adapts seamlessly to your workflow. Its intuitive
                           interface ensures ease of use for beginners, while
                           its powerful features provide the flexibility and
                           functionality demanded by businesses of all sizes.
                        </li>
                     </ul>
                     <ul className={cl.about__sublist}>
                        {/* <li className={cl.counter}>2</li> */}
                        <li>
                           No matter your industry or technical expertise, our
                           app offers a streamlined experience, making it the
                           perfect tool for organizing, managing, and tracking
                           stocks efficiently—without the complexity of other
                           solutions. Lightweight and fast, it won't overwhelm
                           your devices or your team, allowing everybody to
                           focus on what matters most.
                        </li>
                        <li>
                           From home life to business operations, our
                           <span> STOQ app</span> empowers users with a
                           hassle-free and versatile tool that grows with you.
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         <div className={cl.benefits} id="benefits">
            <div className={cl.wrapper}>
               <div className={cl.benefits__content}>
                  <h3 className={cl.title}>Benefits</h3>
                  <Slider
                     {...{
                        ...benefitsSliderSettings,
                        slidesToShow:
                           windowWidth < 900
                              ? 1
                              : windowWidth < 1200
                                ? 2
                                : windowWidth < 1920
                                  ? 4
                                  : 5,
                        centerMode: !(windowWidth < 400),
                        autoplaySpeed: 4000,
                        className: cl.benefits__slider,
                     }}
                  >
                     {benefits.map((benefit) => (
                        <div key={benefit.name} className={cl.benefits__slide}>
                           <h4>{benefit.name}</h4>
                           <p>{benefit.desc}</p>
                        </div>
                     ))}
                  </Slider>
               </div>
            </div>
         </div>

         <div className={cl.download} id="download">
            <div className={cl.wrapper}>
               <div className={cl.download__content}>
                  <div className={cl.download__info}>
                     <h3 className={cl.title}>Download</h3>
                     <p className={cl.download__desc}>
                        Your Reliable Partner in Asset Management. Asset
                        Management. Your Reliable Reliable
                     </p>
                  </div>
                  <ul className={cl.download__list}>
                     <li>
                        <img src={icons.appStore} alt="" />
                        <h4>App Store</h4>
                        <Link
                           to={texts.BASE_URL + 'download'}
                           className={cl.download__btn}
                        >
                           INSTALL NOW
                        </Link>
                     </li>
                     <li>
                        <img src={icons.samsungStore} alt="" />
                        <h4>Galaxy Store</h4>
                        <Link
                           to={texts.BASE_URL + 'download'}
                           className={cl.download__btn}
                        >
                           INSTALL NOW
                        </Link>
                     </li>
                     <li>
                        <img src={icons.playStore} alt="" />
                        <h4>Google Play</h4>
                        <Link
                           to={texts.BASE_URL + 'download'}
                           className={cl.download__btn}
                        >
                           INSTALL NOW
                        </Link>
                     </li>
                     <li>
                        <img src={icons.appGallery} alt="" />
                        <h4>App Gallery</h4>
                        <Link
                           to={texts.BASE_URL + 'download'}
                           className={cl.download__btn}
                        >
                           INSTALL NOW
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MainPage;
