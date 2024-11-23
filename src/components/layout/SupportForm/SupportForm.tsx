import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { StylesConfig } from 'react-select';
import { images, texts } from '@/constants';

import cl from './SupportForm.module.scss';
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
      .min(1, 'is required')
      .max(100, 'too long'),
   email: z.string({ required_error: 'is required' }).email('is wrong'),
   message: z
      .string({ required_error: 'is required' })
      .trim()
      .min(15, 'too short')
      .max(1000, 'too long'),
});

interface IFirstFormData {
   name: string;
   email: string;
   message: string;
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

interface SupportFormProps {}

export const SupportForm: React.FC<SupportFormProps> = ({}) => {
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
                  <label htmlFor="message" className={cl.label}>
                     Message
                     {errors.message && (
                        <span className={cl.error}>
                           {errors.message.message}
                        </span>
                     )}
                  </label>
                  <Controller
                     name="message"
                     control={control}
                     render={({ field }) => (
                        <textarea
                           className={cl.textarea}
                           title="Discribe your problem"
                           placeholder="Discribe your problem"
                           {...field}
                           style={{
                              borderColor: errors.message ? 'red' : '#575757',
                           }}
                        ></textarea>
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
