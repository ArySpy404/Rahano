import {
  Map,
  Flag,
  LockKeyhole,
  Check,
  ArrowLeft,
  ArrowRight,
  Laptop,
} from "lucide-react";

import { useState } from "react";
import "../../css/Dashboard/Roadmap.css";

export default function Roadmap({ steps = [], handleExerciseChange }) {
  const [selectedStep, setSelectedStep] = useState(null);

  const currentStep = steps.find((step) => step.status === "current");

  const activeStep = selectedStep
    ? steps.find((step) => step.id === selectedStep)
    : currentStep || steps[0];

  const selectStep = (step) => {
    if (step.status === "locked") return;
    setSelectedStep(step.id);
  };

  return (
    <section className="roadmap-section">
      <div className="roadmap-header">
        <div className="roadmap-heading">
          <Map size={27} />
          <h2>مسیر یادگیری من</h2>
        </div>

        <button
          className="roadmap-details"
          onClick={() => setSelectedStep(activeStep?.id)}
        >
          مشاهده جزئیات
          <ArrowLeft size={19} />
        </button>
      </div>

      <div className="roadmap-timeline">
        <div className="timeline-line" />

        {steps.map((step, index) => {
          const isLocked = step.status === "locked";

          return (
            <div key={step.id} className={`roadmap-item ${step.status}`}>
              <button
                className="timeline-marker"
                onClick={() => selectStep(step)}
                disabled={isLocked}
                title={isLocked ? "این مرحله هنوز قفله" : undefined}
                aria-label={`مرحله ${step.number}`}
              >
                {step.status === "completed" ? (
                  <Check size={22} />
                ) : step.status === "current" ? (
                  <Flag size={22} />
                ) : (
                  <LockKeyhole size={21} />
                )}
              </button>

              <div
                className={`roadmap-step-card ${
                  selectedStep === step.id ? "selected" : ""
                }`}
                aria-disabled={isLocked}
                onClick={() => selectStep(step)}
              >
                <span className="roadmap-step-number">مرحله {step.number}</span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                <div className="roadmap-step-progress">
                  {step.exercises?.filter((exercise) => exercise.completed)
                    .length || 0}
                  {" / "}
                  {step.exercises?.length || 0}
                  {" تمرین"}
                </div>

                <div className="mini-progress">
                  <div
                    style={{
                      width: `${
                        step.exercises?.length
                          ? (step.exercises.filter(
                              (exercise) => exercise.completed,
                            ).length /
                              step.exercises.length) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {index !== steps.length - 1 && (
                <div className="roadmap-connector">
                  <ArrowRight size={22} />
                </div>
              )}
            </div>
          );
        })}

        {steps.length === 0 && (
          <p className="empty-roadmap">هنوز مرحله‌ای برای نمایش وجود نداره.</p>
        )}
      </div>

      {activeStep && (
        <div className="roadmap-exercises">
          <div className="exercise-heading">
            <Laptop size={21} />
            <h3>{activeStep.title}</h3>
          </div>

          {activeStep.exercises?.length > 0 ? (
            activeStep.exercises.map((exercise, index) => {
              const exerciseText =
                typeof exercise === "string"
                  ? exercise
                  : exercise.title || exercise.name || `تمرین ${index + 1}`;

              return (
                <label key={exercise._id || index} className="exercise-item">
                  <input
                    type="checkbox"
                    checked={
                      typeof exercise === "object"
                        ? Boolean(exercise.completed)
                        : false
                    }
                    disabled={typeof exercise !== "object" || !exercise._id}
                    onChange={(event) =>
                      handleExerciseChange(exercise._id, event.target.checked)
                    }
                  />

                  <span>{exerciseText}</span>
                </label>
              );
            })
          ) : (
            <p className="empty-exercises">تمرینی برای این مرحله ثبت نشده.</p>
          )}
        </div>
      )}
    </section>
  );
}
