import React, { useState } from 'react';

type StepperProps = {
   steps: number;
   currentStep: number;
   onStepChange: (step: number) => void;
};

const Stepper: React.FC<StepperProps> = ({
   steps,
   currentStep,
   onStepChange,
}) => {
   return (
      <div style={styles.container}>
         {[...Array(steps)].map((_, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            let backgroundColor = 'rgba(255, 255, 255, 0.5)';
            let color = 'gray';
            let opacity = 0.5;

            if (isCompleted) {
               backgroundColor = 'rgba(0, 128, 0, 0.5)'; // Зеленый с прозрачностью
               color = 'gray';
               opacity = 0.5;
            } else if (isActive) {
               backgroundColor = 'white'; // Белый для текущего шага
               opacity = 1;
            }

            return (
               <React.Fragment key={index}>
                  {/* Шаг (Кружок) */}
                  <div
                     style={{
                        ...styles.step,
                        backgroundColor,
                        color,
                        opacity,
                     }}
                     onClick={() => onStepChange(index)}
                  >
                     {index + 1}
                  </div>

                  {/* Линия между шагами */}
                  {index < steps - 1 && (
                     <div
                        style={{
                           ...styles.line,
                           backgroundColor:
                              index < currentStep
                                 ? 'rgba(0, 128, 0, 0.5)' // Зеленая линия
                                 : 'gray', // Серая линия
                        }}
                     />
                  )}
               </React.Fragment>
            );
         })}
      </div>
   );
};

// CSS-in-JS для основных стилей
const styles: { [key: string]: React.CSSProperties } = {
   container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '20px',
   },
   step: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '2px solid gray',
   },
   line: {
      flexGrow: 1, // Динамически растягиваем линию
      height: '2px',
      borderRadius: '2px',
      margin: '0 10px',
      transition: 'background-color 0.3s ease',
   },
};

export default Stepper;
