import '../../css/Onbording/ProgressBar.css';
import Progress from './progress';

export default function ProgressBar ({ currentStep, totalSteps }) {
    return (
        <div className="progressbar">
           <Progress
        currentStep={currentStep}
        totalSteps={totalSteps}
        /> 
        </div>
        
    )
}