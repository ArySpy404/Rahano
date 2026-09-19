import { MoveLeft, TimerIcon } from "lucide-react";
import TimeOption from "./TimeOptions";
import { Clock, EnergyIcon, Hourglass } from "@hugeicons/core-free-icons";
import '../../css/Onbording/LearningTime.css';
import { useState } from "react";


export default function LearningTime ({onNext , onBack}) {
    const [selectedTime , setSelectedTime] = useState(null);
    return (
        <div className="learning-time">
            <div className="time-text">
              <p>حالا بریم سراغ زمانت</p>
            <TimerIcon className="time-icon"/>  
            </div>
            
            <h2>چقدر در هفته می‌تونی برای یادگیری وقت بذاری؟</h2>
            <p className="fix-text">این کمک می‌کنه رهانو سرعت و فشردگی مسیرتو متناسب با وقتت تنظیم کنه.</p>

            <div className="time-cards">
              <TimeOption
                icon={Hourglass}
                time="کمتر از 2 ساعت"
                color='#794EF8'
                className='option-icon'
                onClick={() => {setSelectedTime('bit')}}
                selected={selectedTime === 'bit'}
            />
            <TimeOption
                icon={Clock}
                time="2 تا 5 ساعت"
                color='#794EF8'
                className='option-icon'
                onClick={() => {setSelectedTime('mid')}}
                selected={selectedTime === 'mid'}
            />
            <TimeOption
                icon={Clock}
                time="5 تا 10 ساعت"
                color='#794EF8'
                className='option-icon'
                onClick={() => {setSelectedTime('larg')}}
                selected={selectedTime === 'larg'}
            />
            <TimeOption
                icon={EnergyIcon}
                time="بیشتر از 10 ساعت"
                color='#0A0F23'
                className='option-icon-green'
                onClick={() => {setSelectedTime('x-large')}}
                selected={selectedTime === 'x-large'}
            />  
            </div>
            

            <div className="links">
                            <button className="back" onClick={onBack}>قبلی</button>
                           <button className="next" onClick={onNext}
                           disabled = {!selectedTime}>
                            ادامه
                           <MoveLeft color='#FFFFFF'/>
                           </button>
                        </div>  
        </div>
    )
}