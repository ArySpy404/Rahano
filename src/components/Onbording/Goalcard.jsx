
import { HugeiconsIcon } from "@hugeicons/react";
import { Check } from "lucide-react";

export default function GoalCard ({title , description , comingSoon, selected , onClick , icon, accentBg, accentColor}) {
    return (
        <div
            className={`goal-card ${selected ? 'selected' : ''} ${comingSoon ? 'disabled' : ''}`}
            onClick={comingSoon ? undefined : onClick}
        >
                    <div className="goal-title">
                    <h2>{title}</h2>  
                    <div className="icon" style={{ background: accentBg }}>
                       <HugeiconsIcon icon={icon} size={70} strokeWidth={0.9} color={accentColor || "#5F2DE6"}/> 
                    </div>
                    
                    
                    </div>
                    
                    <p>{description}</p> 

                     {selected && <Check className="goalCard-check" size={17}/>} 
                </div>
    )
}