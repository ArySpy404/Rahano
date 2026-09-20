import { HugeiconsIcon } from "@hugeicons/react";
import GeneratingChoises from "./GeneratingChoises";
import { Route} from "@hugeicons/core-free-icons";
import '../../css/Onbording/RoadmapGenerating.css';

export default function RoadmapGenerating () {
    return (
        <div className="roadmap-generating">
            <div className="logo-container">

    <div className="logo">
        <HugeiconsIcon icon={Route} />
    </div>
</div>
                

                <h2>داریم مسیرتو میسازیم...</h2>
                <p className="generate-text">بر اساس هدف، سطح‌فعلی و زمانی که بهمون گفتی، رهانو داره یه مسیر مخصوص خودت طراحی می‌کنه. چند لحظه صبر کن.</p>
                <div className="road-choises">

                    <GeneratingChoises
                        text='تحلیل هدف و سطح فعلی'
                    />

                    <GeneratingChoises
                        text='چیدمان مراحل و منابع'
                    />

                    <GeneratingChoises
                        text='آماده سازی داشبورد'
                    />
                
            </div>
        </div>
    )
}