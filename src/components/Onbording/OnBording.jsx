import OnboardingHeader from "./OnboardingHeader";
import ProgressBar from "./ProgressBar";
import GoalSelector from "./GoalSelector";
import "../../css/Onbording/Onboarding.css";
import { useState } from "react";
import Step2Body from "./step2Body";
import LearningTime from "./LearningTime";
import LearningModle from "./LearningModle";
import InterestSelector from "./InterestSelector";
import RoadmapGenerating from "./RoadmapGenerating";
import SubCategory from "./Sub-categories/Sub-Category";
import ArtDesign from "./Sub-categories/Art-Desing";
import Language from "./Sub-categories/language";
import PersonalSkills from "./Sub-categories/personal-skills";
import ContentProduction from "./Sub-categories/Contect-Production";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const handleNext = () => {
    if (currentStep <= 5) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const [goal, setGoal] = useState(null);
  const [field, setField] = useState(null);
  const [level, setLevel] = useState(null);
  const [learningTime, setLearningTime] = useState(null);
  const [learningModel, setLearningModel] = useState(null);
  const [category, setCategory] = useState(null);

  const onboardingData = {
    goal,
    field,
    category,
    level,
    learningTime,
    learningModel,
  };

  const subCategoryComponents = {
    tech: SubCategory,
    art: ArtDesign,
    language: Language,
    self: PersonalSkills,
    contect: ContentProduction,
  };
  const SelectedSubCategory = subCategoryComponents[field];
  return (
    <div className="onboarding">
      <OnboardingHeader />
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {currentStep === 1 && (
        <GoalSelector onNext={handleNext} setGoal={setGoal} goal={goal} />
      )}

      {currentStep === 2 && (
        <InterestSelector
          onNext={handleNext}
          onBack={handleBack}
          field={field}
          setField={setField}
        />
      )}
      {currentStep === 3 && SelectedSubCategory && (
        <SelectedSubCategory
          onNext={handleNext}
          onBack={handleBack}
          category={category}
          setCategory={setCategory}
        />
      )}
      {currentStep === 4 && (
        <Step2Body
          onNext={handleNext}
          onBack={handleBack}
          level={level}
          setLevel={setLevel}
        />
      )}
      {currentStep === 5 && (
        <LearningTime
          onNext={handleNext}
          onBack={handleBack}
          learningTime={learningTime}
          setLearningTime={setLearningTime}
        />
      )}
      {currentStep === 6 && (
        <LearningModle
          onNext={handleNext}
          onBack={handleBack}
          learningModel={learningModel}
          setLearningModel={setLearningModel}
        />
      )}
      {currentStep === 7 && <RoadmapGenerating />}
    </div>
  );
}
