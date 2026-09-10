import '../../css/Onbording/Progress.css'

export default function Progress ({ currentStep, totalSteps }) {
            const progress = (currentStep / totalSteps) * 100;
    return(
      <div className="progress-bar">
    <div
        className="progress"
            style={{
                width : `${progress}%`
            }}
    ></div>
</div>  
    )
    
}