import { Trophy, Clock3, ChartNoAxesCombined } from "lucide-react";

import "../../css/Dashboard/UserStatus.css";

export default function UserStatus({
  currentStep = 0,
  totalSteps = 0,
  learningTime = "—",
  rank = null,
}) {
  const progress =
    totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  const stats = [
    {
      title: "رتبه فعلی",
      value: rank ?? "—",
      icon: Trophy,
      color: "orange",
      description: "رتبه‌بندی کاربران",
    },
    {
      title: "زمان یادگیری این هفته",
      value: learningTime,
      icon: Clock3,
      color: "purple",
      description: "زمان اختصاص‌یافته به یادگیری",
    },
    {
      title: "درصد پیشرفت کلی",
      value: `${progress}٪`,
      icon: ChartNoAxesCombined,
      color: "green",
      description: "پیشرفت مسیر یادگیری",
      progress,
    },
  ];

  return (
    <section className="user-status">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article className={`stat-card ${stat.color}`} key={stat.title}>
            <div className="stat-card-top">
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <strong>{stat.value}</strong>
              </div>

              <Icon size={38} strokeWidth={2} />
            </div>

            {stat.color === "green" ? (
              <div className="stat-progress">
                <div
                  className="stat-progress-fill"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            ) : (
              <p className="stat-description">{stat.description}</p>
            )}
          </article>
        );
      })}
    </section>
  );
}
