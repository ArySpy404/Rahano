import { Check } from "lucide-react";
import '../../../css/Onbording/Category.css';

export default function Category ({title , icon , text , selected , onClick}) {
    return (
        <div className={`category ${selected ? 'selected' : ''}`} onClick={onClick}>
            {selected && <Check className="category-check" size={17}/>}
            <span className="category-icon">{icon}</span>
            <h4 className="category-title">{title}</h4>
            <p className="category-text">{text}</p>
        </div>
    )
}