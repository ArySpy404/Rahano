import '../../css/Onbording/SkillLevelOption.css';

export default function SkillLevelOption ({range , explain}) {
    return (
       <div className="skill-card">
        <h4>{range}</h4>
        <p>{explain}</p>
    </div> 
    ) 
}