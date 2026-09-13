import { HugeiconsIcon } from "@hugeicons/react";
import '../../css/Onbording/TimeOption.css';
import { Check } from "lucide-react";

export default function TimeOption ({icon , time , color , className , selected , onClick}) {
    return (
        <div className={`time-option ${selected ? 'selected' : ''}`} onClick={onClick}>
            {selected && <Check className="check" size={17}/>}
            <HugeiconsIcon icon={icon} color={color} className={className} size={50}/>
            <p>{time}</p>
        </div>
    )
}