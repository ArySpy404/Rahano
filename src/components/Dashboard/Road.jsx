import '../../css/Dashboard/Road.css';
import RoadProgress from './roadProgress';

export default function Road ({plan , range , time , currentStep, totalSteps}) {
    return (
        <div className="Road">
                <p>مسیر تو</p>
                <h2 className='plan'>یادگیری {plan}</h2>
            <div className="rage-time">
                <p>سطح: {range}</p>
                <p>زمان: {time} </p>
            </div>
            
            {/* <RoadProgress
                currentStep={currentStep}
                totalSteps={totalSteps}
            />
            <p>{`${currentStep} از ${totalSteps} مرحله تکمیل شده`}</p> */}

            <p>مسیر یادگیریت هنوز ساخته نشده</p>
        </div>
    )
}