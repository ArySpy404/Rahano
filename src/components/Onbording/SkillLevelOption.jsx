import { Check } from 'lucide-react';
import '../../css/Onbording/SkillLevelOption.css';

export default function SkillLevelOption ({range , explain , selected , onClick}) {
    return (
       <div className={`skill-card ${selected ? 'selected' : ''}`} onClick={onClick}>
        {selected &&  <Check className='check' size={17}/>}
        <h4>{range}</h4>
        <p>{explain}</p>
    </div> 
    ) 
}