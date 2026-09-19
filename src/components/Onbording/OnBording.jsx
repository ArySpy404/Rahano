import OnboardingHeader from './OnboardingHeader';
import ProgressBar from './ProgressBar';
import GoalSelector from './GoalSelector';
import '../../css/Onbording/Onboarding.css';
import { useState } from 'react';
import Step2Body from './step2Body';
import LearningTime from './LearningTime';
import LearningModle from './LearningModle';
import InterestSelector from './InterestSelector';
import RoadmapGenerating from './RoadmapGenerating';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6 ;
  const handleNext = () => {
    if(currentStep <= 5){
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

    {currentStep === 2 && <InterestSelector onNext={handleNext} onBack={handleBack}/>}
    {currentStep === 3 && <Step2Body  onNext={handleNext} onBack={handleBack}/>}
    {currentStep === 4 && <LearningTime onNext={handleNext} onBack={handleBack}/>}
    {currentStep === 5 && <LearningModle onNext={handleNext} onBack={handleBack}/>}
    {currentStep === 6 && <RoadmapGenerating/>}
    </div>
    
  );
}