import SkillLevelOption from "./SkillLevelOption";
import '../../css/Onbording/step2Body.css';
import { MoveLeft } from "lucide-react";
import { useState } from "react";

export default function Step2Body ({onNext , onBack }) {
    const [selectedLevel , setSelectedLevel] = useState(null);
    return (
        <div className="step-two-body">
                    <p className="lets-go">خب، بریم سراغ سطح فعلیت</p>
                    <h2>الان تو یادگیریِ این مهارت کجایی؟</h2>
                    <p className="start-from-your-region">این کمک می‌کنه رهانو مسیرو از همون‌جایی که هستی شروع کنه، نه از صفر.</p>
        
                    <div className="options">
                        <SkillLevelOption
                            range="کاملاً تازه‌کارم"
                            explain="هنوز شروع نکردم یا خیلی کم بلدم."
                            selected={selectedLevel === "beginner"}
                            onClick={ () => setSelectedLevel("beginner")}
                        />
                        <SkillLevelOption
                            range="یه چیزایی بلدم"
                            explain="مبانی رو می‌دونم ولی نیاز به مسیر منظم دارم."
                            selected={selectedLevel === "some"}
                            onClick={ () => setSelectedLevel("some")}
                        />
                        <SkillLevelOption
                            range="تجربه دارم"
                            explain="می‌خوام سطحمو ارتقاً بدم و تخصصی‌تر برم جلو."
                            selected={selectedLevel === "experienced"}
                            onClick={ () => setSelectedLevel("experienced")}
                        />

                        
                      <div className="links">
                            <button className="back" onClick={onBack}>قبلی</button>
                           <button className="next" onClick={onNext} disabled = {selectedLevel === null}>
                            ادامه
                           <MoveLeft color='#FFFFFF'/>
                           </button>
                        </div>  
                </div>
        </div>
        
    )
}