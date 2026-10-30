import { Check } from "lucide-react";
import "../../css/Dashboard/Steps.css";
import { useState } from "react";

export default function Steps({ steps, handleExerciseChange }) {
  const [openStepId, setOpenStepId] = useState(null);
  const handleOpen = (phase) => {
    if (phase.status === "locked") {
      return;
    }
    if (phase.id === openStepId) {
      setOpenStepId(null);
    } else {
      setOpenStepId(phase.id);
    }
  };

  return (
    <div className="steps">
      {steps.map((step) => (
        <div key={step.id} className={`step ${step.status}`}>
          <div className="step-header" onClick={() => handleOpen(step)}>
            <div className={`num-icon ${step.status}`}>
              {step.status === "completed" ? (
                <Check className="num-check" />
              ) : (
                step.number
              )}
            </div>

            <span>{step.title}</span>
          </div>

          {openStepId === step.id && (
            <div className="step-details">
              <div className="description">
                <p>{step.description}</p>
              </div>

              <ul>
                {step.exercises.map((exercise, index) => (
                  <li key={exercise._id} className="exercise">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={exercise.completed}
                      onChange={(event) =>
                        handleExerciseChange(exercise._id, event.target.checked)
                      }
                    />

                    <span>{exercise.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
