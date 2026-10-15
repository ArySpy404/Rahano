import '../../css/Onbording/GeneratingChoises.css';

export default function GeneratingChoises ({text , status}) {
    return (
        <div className="generating-choise">
            <span>{status}</span>
            <p>{text}</p>
        </div>
    )
}