import { Target02Icon,Briefcase,Route02Icon,Sprout} from '@hugeicons/core-free-icons';
import '../../css/Onbording/GoalSelector.css';
import { MoveLeft } from 'lucide-react';
import { useState } from 'react';
import GoalCard from './Goalcard';


export default function GoalSelector ({onNext}) {
    const [selectedGoal , setSelectedGoal] =useState (null);
    return (
        <div className="body">
            <div className='goal-selector'>
            <p className='find-your-road'>بیا مسیرت رو باهم پیدا کنیم :)</p>
            <h1 className='whats-goal'>اول از همه،می‌خوای به کجا برسی؟</h1>
            <p className='say-goal'>هدفت رو بگو تا رهانو مسیر مناسبی برات بسازه.</p>
            <div className="cards">
                <GoalCard
                    icon={Target02Icon}
                    title="یادگیری یک مهارت"
                    description="یه چیز جدید یاد بگیرم"
                    selected={selectedGoal === 'skill'}
                    onClick={ () => {setSelectedGoal('skill')}}
                    accentBg="#D7CCFB"
                    accentColor="#4218C7"
                />

                <GoalCard
                    icon={Briefcase}
                    title="پیدا کردن مسیر شغلی"
                    description="بفهمم چه کاری مناسب منه"
                    selected={selectedGoal === 'job'}
                    onClick={ () => {setSelectedGoal('job')}}
                    accentBg="#F3F1FD"
                    accentColor="#5F2DE6"
                    comingSoon
                />


                <GoalCard
                    icon={Route02Icon}
                    title="تغییر مسیر"
                    description="می‌خوام مسیرم رو عوض کنم"
                    selected={selectedGoal === 'change'}
                    onClick={ () => {setSelectedGoal('change')}}
                    accentBg="#F9F7FD"
                    accentColor="#794EF8"
                    comingSoon
                />


                <GoalCard
                    icon={Sprout}
                    title="رشد شخصی"
                    description="می‌خوام روی خودم کار کنم"
                    selected={selectedGoal === 'self'}
                    onClick={ () => {setSelectedGoal('self')}}
                    accentBg="#e8f5b2"
                    accentColor="#13d188"
                    comingSoon
                />


                    <button className='next' onClick={onNext}
                    disabled= {!selectedGoal}>
                        ادامه
                    <MoveLeft color='#FFFFFF'/>
                    </button>

                

            </div>
            
        </div>
        <div className="space"></div>
        </div>
        
    )
}