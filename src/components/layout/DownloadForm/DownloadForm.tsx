import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Select, { GroupBase } from 'react-select';
import { icons } from '@/constants';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// Задаем схему валидации с помощью Zod
const validationSchema = z.object({
   name: z.string({ required_error: 'Name is required' }),
   email: z
      .string({ required_error: 'Email is required' })
      .email('Wrong email'),
   phone: z
      .string()
      .optional()
      .refine(
         (val) => val === '' || /^\+?\d*$/.test(val),
         'Phone number must only contain digits and +',
      ),
   age: z
      .string({ required_error: 'Age is required' })
      .regex(/^\d+$/, 'Age must be a number')
      .refine(
         (val) => val !== '0' && Number(val) < 120,
         'the age must be at least 1 and no more than 120',
      ),
   platform: z.object({
      value: z.string(),
      label: z.string(),
   }),
   industry: z.object({
      value: z.string(),
      label: z.string(),
   }),
   terms: z
      .boolean()
      .refine((val) => val === true, 'You must accept the terms'),
});

type FormData = {
   name: string;
   email: string;
   phone?: string;
   age: string;
   platform: SelectOption;
   industry: SelectOption;
   terms: boolean;
};

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

export const DownloadForm: React.FC = () => {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({
      resolver: zodResolver(validationSchema),
   });

   const onSubmit = (data: FormData) => {
      console.log(data);
   };

   //    const [industryOptions, setIndustryOptions] = useState([
   //       { value: 'Tech', label: 'Tech' },
   //       { value: 'Finance', label: 'Finance' },
   //       { value: 'Healthcare', label: 'Healthcare' },
   //       { value: 'Education', label: 'Education' },
   //    ]);

   return (
      <form onSubmit={handleSubmit(onSubmit)} style={styles.formContainer}>
         {/* Name */}
         <div style={styles.inputContainer}>
            <label htmlFor="name" style={styles.label}>
               Name
               {errors.name && (
                  <span style={{ ...styles.error, marginLeft: '10px' }}>
                     {errors.name.message}
                  </span>
               )}
            </label>
            <Controller
               name="name"
               control={control}
               render={({ field }) => (
                  <input
                     {...field}
                     placeholder="Name Surname"
                     style={{
                        ...styles.input,
                        borderColor: errors.name ? 'red' : '#ccc',
                     }}
                  />
               )}
            />
         </div>

         {/* Email */}
         <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>
               Email
               {errors.email && (
                  <span style={{ ...styles.error, marginLeft: '10px' }}>
                     {errors.email.message}
                  </span>
               )}
            </label>
            <Controller
               name="email"
               control={control}
               render={({ field }) => (
                  <input
                     {...field}
                     placeholder="example@gmail.com"
                     style={{
                        ...styles.input,
                        borderColor: errors.email ? 'red' : '#ccc',
                     }}
                  />
               )}
            />
         </div>

         {/* Phone */}
         <div style={styles.inputContainer}>
            <label htmlFor="phone" style={styles.label}>
               Phone number
            </label>
            <Controller
               name="phone"
               control={control}
               render={({ field }) => (
                  //   <input
                  //      {...field}
                  //      placeholder="+31 1 72 89 81 20"
                  //      style={styles.input}
                  //      onInput={(e) => {
                  //         const input = e.target as HTMLInputElement;
                  //         // Удаляем все символы, кроме цифр и +
                  //         input.value = input.value.replace(/[^+\d]/g, '');
                  //         field.onChange(input.value); // Обновляем значение в форме
                  //      }}
                  //   />
                  <PhoneInput
                     {...field}
                     country={'us'} // Установите здесь дефолтную страну
                     //  onlyCountries={['ru', 'us', 'nl', 'de', 'fr']} // Список разрешенных стран (опционально)
                     onChange={(value) => field.onChange(value)} // Передаем данные в react-hook-form
                     placeholder="+31 1 72 89 81 20"
                     inputStyle={{
                        width: '100%',
                        padding: '10px 10px 10px 60px',
                        borderRadius: '8px',
                        border: `1px solid ${errors.phone ? 'red' : '#ccc'}`,
                     }}
                  />
               )}
            />
         </div>

         {/* Age */}
         <div style={styles.inputContainer}>
            <label htmlFor="age" style={styles.label}>
               Age
               {errors.age && (
                  <span style={{ ...styles.error, marginLeft: '10px' }}>
                     {errors.age.message}
                  </span>
               )}
            </label>
            <Controller
               name="age"
               control={control}
               render={({ field }) => (
                  <input
                     {...field}
                     placeholder="18"
                     style={{
                        ...styles.input,
                        borderColor: errors.age ? 'red' : '#ccc',
                     }}
                  />
               )}
            />
         </div>

         {/* Device Platform */}
         <div style={styles.inputContainer}>
            <label htmlFor="platform" style={styles.label}>
               Device platform
               {errors.platform && (
                  <span style={{ ...styles.error, marginLeft: '10px' }}>
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
                     onChange={(selectedOption) =>
                        field.onChange(selectedOption)
                     } // Явно вызываем field.onChange
                     styles={{
                        control: (base) => ({
                           ...base,
                           borderColor: errors.industry ? 'red' : '#ccc',
                        }),
                     }}
                  />
               )}
            />
         </div>

         {/* Industry - Custom Select */}
         <div style={styles.inputContainer}>
            <label htmlFor="industry" style={styles.label}>
               Industry
               {errors.industry && (
                  <span style={{ ...styles.error, marginLeft: '10px' }}>
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
                     onChange={(selectedOption) =>
                        field.onChange(selectedOption)
                     } // Явно вызываем field.onChange
                     styles={{
                        control: (base) => ({
                           ...base,
                           borderColor: errors.industry ? 'red' : '#ccc',
                        }),
                     }}
                  />
               )}
            />
         </div>

         {/* Terms Checkbox */}
         <div style={styles.checkboxContainer}>
            <Controller
               name="terms"
               control={control}
               render={({ field }) => (
                  <div style={styles.checkboxWrapper}>
                     <div
                        style={{
                           position: 'relative',
                           width: '30px',
                           height: '30px',
                        }}
                     >
                        <div
                           style={{
                              ...styles.checkbox,
                              background: field.value
                                 ? '#CCE340'
                                 : 'transparent',
                              borderColor: field.value ? '#CCE340' : 'gray',
                           }}
                        >
                           <img
                              src={icons.check}
                              alt=""
                              style={{ width: '100%', height: '100%' }}
                           />
                        </div>
                        <input
                           type="checkbox"
                           checked={field.value}
                           onChange={field.onChange}
                           onBlur={field.onBlur}
                           title="I accept the terms of the user agreement"
                           style={{ ...styles.checkbox, opacity: 0 }}
                        />
                     </div>
                     <span
                        style={{
                           ...styles.checkboxLabel,
                           color: errors.terms ? 'red' : '#333',
                        }}
                     >
                        I accept the terms of the user agreement
                     </span>
                  </div>
               )}
            />
         </div>

         <button type="submit" style={styles.submitButton}>
            Register
         </button>
      </form>
   );
};

const styles: { [key: string]: React.CSSProperties } = {
   formContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
   },
   inputContainer: {
      marginBottom: '20px',
   },
   label: {
      fontSize: '14px',
      marginBottom: '5px',
      display: 'block',
   },
   input: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '14px',
   },
   error: {
      fontSize: '12px',
      color: 'red',
      marginTop: '5px',
      whiteSpace: 'nowrap', // Убираем перенос строк
      overflow: 'hidden',
      textOverflow: 'ellipsis', // Добавляем многоточие
   },
   checkboxContainer: {
      marginBottom: '20px',
   },
   checkboxWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
   },

   checkbox: {
      borderRadius: '12px',
      display: 'block',
      width: '100%',
      height: '100%',
      border: '2px solid gray',
      position: 'absolute',
      top: 0,
      left: 0,
      cursor: 'pointer',
      padding: 3,
   },
   checkboxLabel: {
      fontSize: '14px',
   },
   submitButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
   },
};
