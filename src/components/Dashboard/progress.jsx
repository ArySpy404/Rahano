import '../../css/Dashboard/Progress.css';

export default function Progress ({currentStep , totalSteps}) {
    const progress = (currentStep / totalSteps) * 100;
    return (
        <div className="progress">
            <div className="progress-bar"
            style={{
                width : `${progress}%`
            }}
            >

            </div>
        </div>
    )
}