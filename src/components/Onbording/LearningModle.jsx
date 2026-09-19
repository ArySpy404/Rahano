import { MoveLeft } from 'lucide-react';
import '../../css/Onbording/LearningModle.css';
import LearningModleCard from './LearningModleCard';
import { useState } from 'react';

export default function LearningModle ({onNext , onBack}) {
    const [selectedModle , setSelectedModle] = useState(null)
    return (
        <div className="learning-modle">
            <p className='first'>خب، یه چیز دیگه مونده...</p>
            <h2>با چه مدل یادگیری‌ای راحت تری؟</h2>
            <p className='step5-text'>این کمک می‌کنه محتوای مسیر رو با سبک یادگیری خودت هماهنگ کنیم.</p>

            <div className="modle-card">
                <LearningModleCard
                emoji='🛠️'
                way='با انجام دادن'
                wayDtile='پروژه و تمرین عملی بیشتر.'
                className='emoji'
                onClick={() => {setSelectedModle('do')}}
                selected={selectedModle === 'do'}
            />

            <LearningModleCard
                emoji='📚'
                way='قدم به قدم'
                wayDtile='اول مفاهیم، بعد تمرین.'
                className='emoji'
                onClick={() => {setSelectedModle('stepBystep')}}
                selected={selectedModle === 'stepBystep'}
            />

            <LearningModleCard
                emoji='🧩'
                way='با حل مسئله'
                wayDtile='چالش و مسئله بیشتر، توضیح کمتر.'
                className='emoji'
                onClick={() => {setSelectedModle('challenge')}}
                selected={selectedModle === 'challenge'}
            />
            <LearningModleCard
                emoji='🎥'
                way='ترکیبی'
                wayDtile='ویدیو،مطالعه و تمرین در کنار هم.'
                className='emoji green'
                onClick={() => {setSelectedModle('mix')}}
                selected={selectedModle === 'mix'}
            />
            </div>
            

            <div className="links">
                            <button className="back" onClick={onBack}>قبلی</button>
                           <button className="next" onClick={onNext}disabled={!selectedModle}>
                            ادامه
                           <MoveLeft color='#FFFFFF'/>
                           
                           </button>
                        </div> 
        </div>
    )
}