import { Check } from "lucide-react";
import '../../css/Onbording/InterestOption.css'

export default function InterestOption ({skillIcon , skillText , selected , onClick }) {
    return (
        <div className={`interest-option ${selected ? 'selected' : ''}`}onClick={onClick}>
            {selected && <Check className='interest-check' size={17}/>}
            <span>{skillIcon}</span>
            <h4>{skillText}</h4>
        </div>
    )
}