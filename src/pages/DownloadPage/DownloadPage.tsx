import { useState } from 'react';
import { Steps, Button, message } from 'antd';
import Stepper from '@/components/UI/Stepper/Stepper';
import { DownloadForm } from '@/components/layout/DownloadForm/DownloadForm';

interface Props {}

const steps = [
   {
      title: 'Stage 1',
      content: 'First-content',
   },
   {
      title: 'Stage 2',
      content: 'Second-content',
   },
   {
      title: 'Final',
      content: 'Last-content',
   },
];

const { Step } = Steps;

const DownloadPage: React.FC<Props> = () => {
   const [currentStep, setCurrentStep] = useState(0);
   const totalSteps = 3;

   const handleNext = () => {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
   };

   const handlePrevious = () => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
   };
   const items = steps.map((item) => ({ key: item.title, title: item.title }));

   const getNextBtnText = (currentStep: number, totalSteps: number) => {
      const isFinalStep = totalSteps - currentStep === 1;
      const isPrefinalStep = totalSteps - currentStep === 2;

      return isFinalStep
         ? 'Home Page'
         : isPrefinalStep
           ? 'Join the Beta Test'
           : ' Next Step';
   };

   return (
      <div style={{ marginTop: 200, width: 500 }}>
         <Stepper
            steps={totalSteps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
         />
         <DownloadForm />
         <div
            style={{
               display: 'flex',
               justifyContent: 'space-between',
               marginTop: '20px',
            }}
         >
            <button
               onClick={handleNext}
               disabled={currentStep === totalSteps - 1}
            >
               {getNextBtnText(currentStep, totalSteps)}
            </button>
            <button onClick={handlePrevious} disabled={currentStep === 0}>
               Previous
            </button>
         </div>
      </div>
   );
};

export default DownloadPage;
