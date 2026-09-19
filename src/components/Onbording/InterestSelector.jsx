import { MoveLeft } from "lucide-react";
import { useState } from "react";
import '../../css/Onbording/InterestSelector.css'
import InterestOpton from "./InterestOption";

export default function InterestSelector ({onNext , onBack}) {
    const [selectedInterest , setSelectedInterest] = useState(null)
    return (
        <div className="interest-selector">
            <div className="search-icon">
                <span>🔍</span>
            </div>
            <p className="title">بذار باهم کشفش کنیم</p>
            <h2>چه چیزهایی برات جالبه؟</h2>
            <p className="title-text">هرچقدر می‌خوای انتخاب کن، این کمکمون می‌کنه حوزه‌ی مناسبتو پیدا کنیم.</p>


            <div className="interest-cards">
                <InterestOpton
                skillIcon='💻'
                skillText='برنامه‌نویسی و تکنولوژی'
                onClick={() => setSelectedInterest('tech')}
                selected={selectedInterest ==='tech'}
            />

            <InterestOpton
                skillIcon='🎨'
                skillText='هنر و طراحی'
                onClick={() => setSelectedInterest('art')}
                selected={selectedInterest === 'art'}
            />

            <InterestOpton
                skillIcon='🌐'
                skillText='زبان'
                onClick={() => setSelectedInterest('language')}
                selected={selectedInterest === 'language'}
            />

            <InterestOpton
                skillIcon='🧘'
                skillText='مهارت‌های فردی'
                onClick={() => setSelectedInterest('self')}
                selected={selectedInterest === 'self'}
            />

            <InterestOpton
                skillIcon='🎬'
                skillText='تولید محتوا'
                onClick={() => setSelectedInterest('contect')}
                selected={selectedInterest === 'contect'}
            />
            </div>
            


            <div className="links">
                            <button className="back" onClick={onBack}>قبلی</button>
                           <button className="next" onClick={onNext}disabled={!selectedInterest}>
                            ادامه
                           <MoveLeft color='#FFFFFF'/>
                           
                           </button>
                        </div> 
        </div>
    )
}