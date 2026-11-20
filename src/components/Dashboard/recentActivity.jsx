import { Activity, CheckCircle2 } from "lucide-react";

import "../../css/Dashboard/RecentActivity.css";

export default function RecentActivity({ steps = [] }) {
  const activities = steps
    .flatMap((step) =>
      (step.exercises || [])
        .filter(
          (exercise) => typeof exercise === "object" && exercise.completed,
        )
        .map((exercise, index) => ({
          id: exercise._id || `${step.id}-${index}`,
          title:
            exercise.title || exercise.name || `تمرین مرحله ${step.number}`,
          phase: step.title,
        })),
    )
    .slice(-4)
    .reverse();

  return (
    <section className="recent-activity">
      <div className="activity-header">
        <Activity size={24} />
        <h2>آخرین فعالیت‌ها</h2>
      </div>

      {activities.length > 0 ? (
        <div className="activity-list">
          {activities.map((item) => (
            <div className="activity-item" key={item.id}>
              <CheckCircle2 className="activity-check" size={27} />

              <div className="activity-info">
                <h3>{item.title}</h3>
                <p>{item.phase}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="activity-empty">
          <p>هنوز فعالیتی ثبت نکردی.</p>
          <span>با انجام اولین تمرین، اینجا رو می‌بینی!</span>
        </div>
      )}
    </section>
  );
}
