import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Select, { StylesConfig } from 'react-select';
import { icons, images, texts } from '@/constants';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './customStyles.css';

import cl from './DownloadForm.module.scss';
import Stepper, { IStep } from '@/components/UI/Stepper/Stepper';
import { Link } from 'react-router-dom';
// Задаем схему валидации с помощью Zod

const getSelectStylesWithCustomParams = (isError: boolean): StylesConfig => {
   return {
      control: (base) => ({
         ...base,
         borderColor: isError ? 'red' : '#575757',
         padding: '4px 15px',
         background: '#575757',
         borderRadius: '12px',
         fontSize: '16px',
         fontWeight: 300,
         fontFamily: 'Poppins',
      }),
      option: (styles) => ({
         ...styles,
         background: '#575757',
         borderRadius: '5px',
         color: 'white',
         cursor: 'pointer',
         fontSize: 16,
         // height: 40,
         fontWeight: 300,
         ':hover': {
            ...styles[':hover'],
            color: 'white',
            background: '#3f3f3f',
         },
      }),
      valueContainer: (styles) => ({
         ...styles,
         padding: '0',
         fontSize: '16px',
         gap: '5px',
      }),
      placeholder: (styles) => ({
         ...styles,
         color: '#a3a1a1',
         padding: 0,
         margin: 0,
      }),
      input: (styles) => ({
         ...styles,
         padding: 0,
         margin: 0,
         color: 'white',
      }),
      menu: (styles) => ({
         ...styles,
         background: '#575757',
         borderRadius: '12px',
         color: 'white',
      }),
      singleValue: (styles) => ({
         ...styles,

         color: 'white',
      }),

      clearIndicator: (styles) => ({
         ...styles,
         cursor: 'pointer',
         color: 'white',
         opacity: 0.7,

         ':hover': {
            ...styles[':hover'],
            opacity: 1,
            color: 'white',
         },
      }),
      dropdownIndicator: (styles) => ({
         ...styles,
         cursor: 'pointer',
         color: 'white',
         opacity: 0.7,

         ':hover': {
            ...styles[':hover'],
            opacity: 1,
            color: 'white',
         },
      }),
   };
};

const FirstFormValidationShema = z.object({
   name: z
      .string({ required_error: 'is required' })
      .trim()
      .min(1, 'is required'),
   email: z.string({ required_error: 'is required' }).email('is wrong'),
   phone: z.string().optional(),
});

const SecondFormValidationSchema = z.object({
   age: z
      .string({ required_error: 'is required' })
      .regex(/^\d+$/, 'must be a number')
      .refine(
         (val) => val !== '0' && Number(val) < 120,
         'must be at least 1 and no more than 120',
      ),
   platform: z.object(
      {
         value: z.string(),
         label: z.string(),
      },
      { required_error: 'is required' },
   ),
   industry: z.object(
      {
         value: z.string(),
         label: z.string(),
      },
      { required_error: 'is required' },
   ),
   terms: z
      .boolean()
      .refine((val) => val === true, 'You must accept the terms'),
});

interface IFirstFormData {
   name: string;
   email: string;
   phone?: string;
}

interface ISecondFormData {
   age: string;
   platform: SelectOption;
   industry: SelectOption;
   terms: boolean;
}

export interface SelectOption {
   readonly value: string;
   readonly label: string;
}

export const industryOptions: readonly SelectOption[] = [
   { value: 'vanilla', label: 'Vanilla' },
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'salted-caramel', label: 'Salted Caramel' },
];
export const platformOptions: readonly SelectOption[] = [
   { value: 'ios', label: 'iOS' },
   { value: 'android', label: 'Android' },
];

interface DownloadFormProps {}

export const DownloadForm: React.FC<DownloadFormProps> = ({}) => {
   const [firstFormData, setFirstFormData] = useState<IFirstFormData>();
   const [secondFormData, setSecondFormData] = useState<ISecondFormData>();
   const [firstFormComplited, setFirstFormComplited] = useState(false);
   const [secondFormComplited, setSecondFormComplited] = useState(false);
   const [currentStepIndex, setCurrentStepIndex] = useState(0);
   const FirstStepForm = () => {
      const {
         control,
         handleSubmit,
         formState: { errors },
      } = useForm<IFirstFormData>({
         resolver: zodResolver(FirstFormValidationShema),
         defaultValues: firstFormData,
      });

      const onSubmit = (data: IFirstFormData) => {
         setFirstFormData(data);
         setFirstFormComplited(true);
         setCurrentStepIndex(1);
      };

      // useEffect(() => {
      //    if (errors.email || errors.phone || errors.name) {
      //       setFirstFormComplited(true);
      //    } else {
      //       setFirstFormComplited(false);
      //    }
      // }, [errors]);
      return (
         <form onSubmit={handleSubmit(onSubmit)} className={cl.formContainer}>
            <div>
               {/* Name */}
               <div className={cl.inputContainer}>
                  <label htmlFor="name" className={cl.label}>
                     Name
                     {errors.name && (
                        <span className={cl.error}>{errors.name.message}</span>
                     )}
                  </label>
                  <Controller
                     name="name"
                     control={control}
                     render={({ field }) => (
                        <input
                           className={cl.input}
                           {...field}
                           placeholder="Name Surname"
                           style={{
                              borderColor: errors.name ? 'red' : '#575757',
                           }}
                        />
                     )}
                  />
               </div>

               {/* Email */}
               <div className={cl.inputContainer}>
                  <label htmlFor="email" className={cl.label}>
                     Email
                     {errors.email && (
                        <span className={cl.error}>{errors.email.message}</span>
                     )}
                  </label>
                  <Controller
                     name="email"
                     control={control}
                     render={({ field }) => (
                        <input
                           className={cl.input}
                           {...field}
                           placeholder="example@gmail.com"
                           style={{
                              borderColor: errors.email ? 'red' : '#575757',
                           }}
                        />
                     )}
                  />
               </div>

               {/* Phone */}
               <div className={cl.inputContainer}>
                  <label htmlFor="phone" className={cl.label}>
                     Phone number
                  </label>
                  <Controller
                     name="phone"
                     control={control}
                     render={({ field }) => (
                        //   <input className={cl.input}
                        //      {...field}
                        //      placeholder="+31 1 72 89 81 20"
                        //      onInput={(e) => {
                        //         const input = e.target as HTMLInputElement;
                        //         // Удаляем все символы, кроме цифр и +
                        //         input.value = input.value.replace(/[^+\d]/g, '');
                        //         field.onChange(input.value); // Обновляем значение в форме
                        //      }}
                        //   />
                        <PhoneInput
                           {...field}
                           // country={'us'} // Установите здесь дефолтную страну
                           //  onlyCountries={['ru', 'us', 'nl', 'de', 'fr']} // Список разрешенных стран (опционально)
                           onChange={(value) => field.onChange(value)} // Передаем данные в react-hook-form
                           placeholder="+31 12 23737372"
                           enableSearch
                           // inputClass="custom-input"
                           // buttonClass="custom-dropdown-button"
                           // dropdownClass="custom-dropdown"
                           // disableDropdown
                           // disableCountryGuess
                           buttonStyle={{
                              borderRadius: 12,
                              border: 'none',
                              background: 'transparent',
                              // padding: 30,
                              display: 'none',
                           }}
                           // jumpCursorToEnd

                           inputStyle={{
                              borderRadius: 12,
                              width: '100%',
                              padding: '22px 15px 22px 15px',
                              background: '#575757',
                              border: `1px solid ${errors.phone ? 'red' : '#575757'}`,
                              fontSize: 16,
                              color: 'white',
                              overflow: 'hidden',
                           }}
                           inputClass={cl.input}
                           containerStyle={{
                              borderRadius: 12,
                              overflow: 'hidden',
                           }}
                           searchStyle={{
                              width: '86%',
                           }}
                           disableDropdown
                           disableSearchIcon
                        />
                     )}
                  />
               </div>
            </div>

            {/* <div></div> */}

            <button className={cl.btn} type="submit">
               Next Step
            </button>
         </form>
      );
   };

   const SecondStepForm = () => {
      const {
         control,
         handleSubmit,
         formState: { errors },
      } = useForm<ISecondFormData>({
         resolver: zodResolver(SecondFormValidationSchema),
         defaultValues: secondFormData,
      });

      const onSubmit = (data: ISecondFormData) => {
         setSecondFormData(data);
         setSecondFormComplited(true);
         setCurrentStepIndex(2);

         console.log({ ...secondFormData });
      };

      const handleGoBack = () => {
         setCurrentStepIndex(0);
      };

      // useEffect(() => {
      //    if (errors.age || errors.industry || errors.platform || errors.terms) {
      //       setSecondFormComplited(true);
      //    } else {
      //       setSecondFormComplited(false);
      //    }
      // }, [errors]);

      return (
         <form onSubmit={handleSubmit(onSubmit)} className={cl.formContainer}>
            <div>
               {/* Age */}
               <div className={cl.inputContainer}>
                  <label htmlFor="age" className={cl.label}>
                     Age
                     {errors.age && (
                        <span className={cl.error}>{errors.age.message}</span>
                     )}
                  </label>
                  <Controller
                     name="age"
                     control={control}
                     render={({ field }) => (
                        <input
                           className={cl.input}
                           {...field}
                           placeholder="18"
                           style={{
                              borderColor: errors.age ? 'red' : '#575757',
                           }}
                        />
                     )}
                  />
               </div>

               {/* Device Platform */}
               <div className={cl.inputContainer}>
                  <label htmlFor="platform" className={cl.label}>
                     Device platform
                     {errors.platform && (
                        <span className={cl.error}>
                           {errors.platform.message}
                        </span>
                     )}
                  </label>
                  <Controller
                     name="platform"
                     control={control}
                     render={({ field }) => (
                        <Select
                           value={field.value}
                           options={platformOptions}
                           placeholder="iOS / Android"
                           onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                           } // Явно вызываем field.onChange
                           styles={getSelectStylesWithCustomParams(
                              !!errors.platform,
                           )}
                        />
                     )}
                  />
               </div>

               {/* Industry - Custom Select */}
               <div className={cl.inputContainer}>
                  <label htmlFor="industry" className={cl.label}>
                     Industry
                     {errors.industry && (
                        <span className={cl.error}>
                           {errors.industry.message}
                        </span>
                     )}
                  </label>
                  <Controller
                     name="industry"
                     control={control}
                     render={({ field }) => (
                        <Select
                           value={field.value}
                           options={industryOptions}
                           placeholder="Your industry"
                           onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                           } // Явно вызываем field.onChange
                           styles={getSelectStylesWithCustomParams(
                              !!errors.industry,
                           )}
                        />
                     )}
                  />
               </div>

               {/* Terms Checkbox */}
               <div className={cl.checkboxContainer}>
                  <Controller
                     name="terms"
                     control={control}
                     render={({ field }) => (
                        <div className={cl.checkboxWrapper}>
                           <div
                              style={{
                                 position: 'relative',
                                 width: '25px',
                                 height: '25px',
                              }}
                           >
                              <div
                                 className={cl.checkbox}
                                 style={{
                                    background: field.value
                                       ? '#CCE340'
                                       : 'transparent',
                                    borderColor: field.value
                                       ? '#CCE340'
                                       : 'gray',
                                 }}
                              >
                                 <img
                                    src={icons.check}
                                    alt="I accept the terms of the user agreement"
                                    style={{
                                       paddingTop: 2,
                                       width: '90%',
                                       height: '90%',
                                       objectFit: 'contain',
                                       opacity: field.value ? 1 : 0,
                                    }}
                                 />
                              </div>
                              <input
                                 type="checkbox"
                                 checked={field.value}
                                 onChange={field.onChange}
                                 onBlur={field.onBlur}
                                 title="I accept the terms of the user agreement"
                                 style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 20,
                                    opacity: 0,
                                    cursor: 'pointer',
                                 }}
                              />
                           </div>
                           <span
                              className={cl.checkboxLabel}
                              style={{
                                 color: errors.terms ? 'red' : '#bababa',
                              }}
                           >
                              I accept the terms of the{' '}
                              <Link to={texts.BASE_URL + 'agreement'}>
                                 user agreement
                              </Link>
                           </span>
                        </div>
                     )}
                  />
               </div>
               <div className={cl.btns}>
                  <button className={cl.btn} type="submit">
                     Join the Beta Test
                  </button>
                  <button
                     className={cl.link}
                     type="button"
                     onClick={handleGoBack}
                  >
                     Previous Step
                  </button>
               </div>
            </div>
         </form>
      );
   };

   const SuccessMessage = () => {
      return (
         <div className={cl.successContainer}>
            <img className={cl.successImage} src={images.blank} alt="success" />
            <p className={cl.successText}>
               <span>Thank you</span> for your application! Our team will reach
               out to you soon. Look for an invitation in{' '}
               <span className={cl.successTextAccent}>your inbox.</span>
            </p>
            <div className={cl.btns}>
               <Link to={texts.BASE_URL + 'about'} className={cl.btn}>
                  Home Page
               </Link>
               <a className={cl.link}>Read the FAQ</a>
            </div>
         </div>
      );
   };

   const onStepChange = (currentStepIndex: number, newStepIndex: number) => {
      if (
         !steps[currentStepIndex].isComplited &&
         newStepIndex > currentStepIndex
      ) {
         setCurrentStepIndex(currentStepIndex);
      } else {
         setCurrentStepIndex(newStepIndex);
      }
   };

   const steps: IStep[] = [
      {
         item: <FirstStepForm />,
         isComplited: firstFormComplited,
      },
      {
         item: <SecondStepForm />,
         isComplited: secondFormComplited,
      },
      {
         item: <SuccessMessage />,
         isComplited: false,
      },
   ];

   return (
      <>
         <Stepper
            steps={steps}
            currentStepIndex={currentStepIndex}
            onStepChange={onStepChange}
         />
      </>
   );
};
