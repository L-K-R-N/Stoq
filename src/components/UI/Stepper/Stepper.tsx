import React, { ReactNode } from 'react';
import cl from './Stepper.module.scss';

export interface IStep {
   item: ReactNode;
   isComplited: boolean;
}

type StepperProps = {
   steps: IStep[];
   currentStepIndex: number;
   onStepChange: (currentStepIndex: number, newStepIndex: number) => void;
};

const Stepper: React.FC<StepperProps> = ({
   steps,
   currentStepIndex,
   onStepChange,
}) => {
   const handleStepChange = (
      currentStepIndex: number,
      newStepIndex: number,
   ) => {
      onStepChange(currentStepIndex, newStepIndex);

      console.log(currentStepIndex, newStepIndex);
   };
   return (
      <div className={cl.container}>
         <div className={cl.indicatorContainer}>
            {steps.map((_, index) => {
               const isCompleted = index < currentStepIndex;
               const isActive = index === currentStepIndex;

               let backgroundColor = 'rgba(255, 255, 255, 0.5)';
               let color = '#3a3a3a';
               let opacity = 0.5;

               if (isCompleted) {
                  backgroundColor = '#cce340'; // Зеленый с прозрачностью
                  opacity = 0.7;
               } else if (isActive) {
                  backgroundColor = 'white';
                  opacity = 1;
               }

               return (
                  <React.Fragment key={index}>
                     {/* Шаг (Кружок) */}
                     <div
                        className={cl.step}
                        style={{
                           backgroundColor,
                           color,
                           opacity,
                        }}
                        onClick={() =>
                           handleStepChange(currentStepIndex, index)
                        }
                     >
                        {index + 1}
                     </div>

                     {/* Линия между шагами */}
                     {index < steps.length - 1 && (
                        <div
                           className={cl.line}
                           style={{
                              backgroundColor:
                                 index < currentStepIndex
                                    ? '#cce34070' // Зеленая линия
                                    : 'gray', // Серая линия
                           }}
                        />
                     )}
                  </React.Fragment>
               );
            })}
         </div>
         <div className={cl.contentContainer}>
            {steps.map((step, index) => (
               <div
                  className={[
                     cl.stepContainer,
                     index === currentStepIndex ? cl.visibleStep : '',
                  ].join(' ')}
               >
                  {step.item}
               </div>
            ))}
         </div>
      </div>
   );
};

// CSS-in-JS для основных стилей

export default Stepper;
