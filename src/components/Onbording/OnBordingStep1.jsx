import OnboardingHeader from './OnboardingHeader';
import ProgressBar from './ProgressBar';
import GoalSelector from './GoalSelector';
import '../../css/Onbording/Onboarding.css';
import { useState } from 'react';
import Step2Body from './step2Body';
import LearningTime from './LearningTime';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps =5 ;
  const handleNext = () => {
    if(currentStep <= 4){
      setCurrentStep(currentStep + 1);
    } 
    
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }
  return (
    <div className='onboarding'>
       
      
      <OnboardingHeader />
      <ProgressBar 
      currentStep={currentStep}
      totalSteps={totalSteps}
      />
      
    {currentStep === 1 && <GoalSelector onNext={handleNext} />}

    {currentStep === 2 && <Step2Body  onNext={handleNext} onBack={handleBack}/>}
    {currentStep === 3 && <LearningTime onNext={handleNext} onBack={handleBack}/>}
    </div>
    
  );
}