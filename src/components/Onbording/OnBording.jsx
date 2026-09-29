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

  const [goal, setGoal] = useState(null);
  const [field, setField] = useState(null);
  const [level, setLevel] = useState(null);
  const [learningTime, setLearningTime] = useState(null);
  const [learningModel, setLearningModel] = useState(null);

  const onboardingData= {
    goal,
    field,
    level,
    learningTime,
    learningModel
  };
  return (
    <div className='onboarding'>
       
      
      <OnboardingHeader />
      <ProgressBar 
      currentStep={currentStep}
      totalSteps={totalSteps}
      />
      
    {currentStep === 1 && <GoalSelector onNext={handleNext} setGoal={setGoal} goal={goal}/>}

    {currentStep === 2 && <InterestSelector onNext={handleNext} onBack={handleBack} field={field} setField={setField}/>}
    {currentStep === 3 && <Step2Body  onNext={handleNext} onBack={handleBack} level={level} setLevel={setLevel}/>}
    {currentStep === 4 && <LearningTime onNext={handleNext} onBack={handleBack} learningTime={learningTime} setLearningTime={setLearningTime}/>}
    {currentStep === 5 && <LearningModle onNext={handleNext} onBack={handleBack} learningModel={learningModel} setLearningModel={setLearningModel}/>}
    {currentStep === 6 && <RoadmapGenerating/>}
    </div>
    
  );
}