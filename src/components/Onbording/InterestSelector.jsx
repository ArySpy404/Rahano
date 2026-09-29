import { MoveLeft } from "lucide-react";
import { useState } from "react";
import '../../css/Onbording/InterestSelector.css'
import InterestOpton from "./InterestOption";

export default function InterestSelector ({onNext , onBack , field ,setField}) {
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
                onClick={() => setField('tech')}
                selected={field ==='tech'}
            />

            <InterestOpton
                skillIcon='🎨'
                skillText='هنر و طراحی'
                onClick={() => setField('art')}
                selected={field === 'art'}
            />

            <InterestOpton
                skillIcon='🌐'
                skillText='زبان'
                onClick={() => setField('language')}
                selected={field === 'language'}
            />

            <InterestOpton
                skillIcon='🧘'
                skillText='مهارت‌های فردی'
                onClick={() => setField('self')}
                selected={field === 'self'}
            />

            <InterestOpton
                skillIcon='🎬'
                skillText='تولید محتوا'
                onClick={() => setField('contect')}
                selected={field === 'contect'}
            />
            </div>
            


            <div className="links">
                            <button className="back" onClick={onBack}>قبلی</button>
                           <button className="next" onClick={onNext}disabled={!field}>
                            ادامه
                           <MoveLeft color='#FFFFFF'/>
                           
                           </button>
                        </div> 
        </div>
    )
}