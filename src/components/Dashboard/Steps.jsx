import { Check } from "lucide-react";
import '../../css/Dashboard/Steps.css';

export default function Steps({ steps }) {
    return (
        <div className="steps">
            {steps.map((step) => (
                <div key={step.id} className={`step ${step.status}`}>
                    <div className={`num-icon ${step.status}`}>
                        {step.status === "completed" ? <Check className="num-check"/> : step.id}
                    </div>

                    {step.title}
                </div>
            ))}
        </div>
    );
}