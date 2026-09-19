import { Check } from 'lucide-react';
import '../../css/Onbording/LearningModleCard.css';

export default function LearningModleCard ({emoji , way , wayDtile , className ,selected , onClick}) {
    return (
        <div className={`learning-modal-card ${selected ? 'selected' : ''}`} onClick={onClick}>
            {selected && <Check className='Learning-check' size={17}/>}
            <span className={className}>{emoji}</span>
            <h4>{way}</h4>
            <p>{wayDtile}</p>
        </div>
    )
}