import Progress from "./progress";


export default function RoadProgress ({ currentStep, totalSteps }) {
    return (
        <div className="roadprogress">
            <Progress
                currentStep={currentStep}
                totalSteps={totalSteps}
            />
        </div>
    )
}