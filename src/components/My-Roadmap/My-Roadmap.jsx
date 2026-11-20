import {
  BookOpen,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Check,
  ChevronLeft,
  Clock3,
  Lock,
  MoveLeft,
  Target,
  Compass,
  Leaf,
  Sparkles,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../Dashboard/Navbar";
import Sidebar from "../Dashboard/sideBar";
import "../../css/My-roadmap/my-roadmap.css";
import confetti from "canvas-confetti";

function toFa(number) {
  return new Intl.NumberFormat("fa-IR").format(number);
}

function getPhases(data) {
  const phases =
    data?.roadmap?.phases || data?.phases || data?.data?.phases || [];

  return phases.map((phase, phaseIndex) => ({
    ...phase,
    id: phase._id || phase.id || phaseIndex,
    title: phase.title || `مرحله ${phaseIndex + 1}`,
    description: phase.description || "",
    duration: phase.duration || "",
    exercises: (phase.exercises || phase.steps || []).map(
      (exercise, exerciseIndex) => ({
        ...exercise,
        id: exercise._id || exercise.id || `${phaseIndex}-${exerciseIndex}`,
        title: exercise.title || exercise.name || `تمرین ${exerciseIndex + 1}`,
        duration: exercise.duration || "",
        completed: Boolean(
          exercise.completed ?? exercise.completionStatus ?? false,
        ),
      }),
    ),
  }));
}

export default function MyRoadmap() {
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingExerciseId, setSavingExerciseId] = useState(null);

  useEffect(() => {
    async function fetchRoadmap() {
      try {
        const response = await fetch("http://localhost:3001/api/roadmap", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "هنوز رودمپی برای حساب شما ساخته نشده است."
              : "دریافت رودمپ با مشکل مواجه شد.",
          );
        }

        const data = await response.json();
        setPhases(getPhases(data));
      } catch (err) {
        setError(err.message || "خطا در اتصال به سرور");
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmap();
  }, []);

  const totalExercises = useMemo(
    () => phases.reduce((total, phase) => total + phase.exercises.length, 0),
    [phases],
  );

  const completedExercises = useMemo(
    () =>
      phases.reduce(
        (total, phase) =>
          total +
          phase.exercises.filter((exercise) => exercise.completed).length,
        0,
      ),
    [phases],
  );

  const progress = totalExercises
    ? Math.round((completedExercises / totalExercises) * 100)
    : 0;

  const currentStepIndex = phases.findIndex(
    (phase) =>
      phase.exercises.length > 0 &&
      !phase.exercises.every((exercise) => exercise.completed),
  );

  const allCompleted =
    totalExercises > 0 && completedExercises === totalExercises;

  const currentStep = allCompleted ? null : phases[currentStepIndex];

  const nextExercise = currentStep?.exercises.find(
    (exercise) => !exercise.completed,
  );

  const toggleExercise = async (phaseIndex, exercise) => {
    if (!exercise._id || savingExerciseId) return;

    const previousPhasesCompleted = phases
      .slice(0, phaseIndex)
      .every((phase) => phase.exercises.every((item) => item.completed));

    if (!previousPhasesCompleted) return;

    const newCompleted = !exercise.completed;

    setSavingExerciseId(exercise.id);

    try {
      const response = await fetch(
        `http://localhost:3001/api/roadmap/exercises/${exercise._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            completed: newCompleted,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
          errorData.error || "ذخیره وضعیت تمرین با مشکل مواجه شد.",
        );
      }

      const result = await response.json();

      setPhases((previousPhases) =>
        previousPhases.map((phase, index) => {
          if (index !== phaseIndex) return phase;

          const updatedExercises = phase.exercises.map((item) =>
            String(item._id) === String(result.exerciseId)
              ? {
                  ...item,
                  completed: result.completed,
                }
              : item,
          );

          const completionStatus =
            updatedExercises.length > 0 &&
            updatedExercises.every((item) => item.completed);

          return {
            ...phase,
            exercises: updatedExercises,
            completionStatus,
          };
        }),
      );
    } catch (err) {
      console.error("Exercise update error:", err);
      window.alert(err.message || "خطا در ذخیره وضعیت تمرین");
    } finally {
      setSavingExerciseId(null);
    }
  };

  useEffect(() => {
    if (!allCompleted) return;

    const colors = [
      "#5B35F5",
      "#8EC977",
      "#FF80AB",
      "#FFD166",
      "#A78BFA",
      "#60A5FA",
    ];

    confetti({
      particleCount: 130,
      spread: 100,
      startVelocity: 45,
      origin: { x: 0.5, y: 0.6 },
      colors,
      zIndex: 9999,
    });

    const leftBurst = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.65 },
        colors,
        zIndex: 9999,
      });
    }, 300);

    const rightBurst = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.65 },
        colors,
        zIndex: 9999,
      });
    }, 600);

    const finalBurst = setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 130,
        startVelocity: 55,
        origin: { x: 0.5, y: 0.4 },
        colors,
        zIndex: 9999,
      });
    }, 1400);

    return () => {
      clearTimeout(leftBurst);
      clearTimeout(rightBurst);
      clearTimeout(finalBurst);
    };
  }, [allCompleted]);

  if (loading) {
    return (
      <div className="my-roadmap">
        <Navbar />

        <div className="my-roadmap__layout">
          <Sidebar />

          <main className="my-roadmap__main">
            <div className="my-roadmap__message">
              <span className="my-roadmap__loader"></span>
              <p>داریم مسیر یادگیریت رو آماده می‌کنیم...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-roadmap">
        <Navbar />

        <div className="my-roadmap__layout">
          <Sidebar />

          <main className="my-roadmap__main">
            <div className="my-roadmap__message my-roadmap__message--error">
              <p>{error}</p>

              <button onClick={() => window.location.reload()}>
                تلاش مجدد
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!phases.length) {
    return (
      <div className="my-roadmap">
        <Navbar />

        <div className="my-roadmap__layout">
          <Sidebar />

          <main className="my-roadmap__main">
            <div className="my-roadmap__message">
              <Compass size={36} />
              <h2>هنوز مسیری نداری!</h2>
              <p>برای شروع، مسیر یادگیری خودت رو بساز.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="my-roadmap">
      <Navbar />

      <div className="my-roadmap__layout">
        <Sidebar />

        <main className="my-roadmap__main">
          <div className="my-roadmap__container">
            <header className="my-roadmap__header">
              <div className="my-roadmap__header-content">
                <span className="my-roadmap__breadcrumb">
                  داشبورد
                  <ChevronLeft size={14} />
                  رودمپ من
                </span>

                <div className="my-roadmap__heading">
                  <div>
                    <h1>مسیر یادگیری من</h1>
                    <p>قدم‌به‌قدم به چیزی که می‌خوای یاد بگیری نزدیک‌تر شو</p>
                  </div>

                  <div className="my-roadmap__heading-icon">
                    <Compass size={30} />
                  </div>
                </div>
              </div>

              <div className="my-roadmap__header-art">
                <Target size={110} strokeWidth={1} />
                <span className="my-roadmap__art-dot"></span>
              </div>
            </header>

            <section className="roadmap-stats">
              <div className="roadmap-stats__item">
                <div className="roadmap-stats__icon">
                  <BookOpen size={21} />
                </div>

                <div>
                  <span>مهارت انتخابی شما</span>
                  <strong>{phases[0]?.skill || "مسیر یادگیری"}</strong>
                </div>
              </div>

              <div className="roadmap-stats__item">
                <div className="roadmap-stats__icon">
                  <ChartNoAxesColumnIncreasing size={21} />
                </div>

                <div>
                  <span>میزان پیشرفت</span>
                  <strong>{toFa(progress)}٪</strong>

                  <div className="roadmap-stats__progress">
                    <span style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>

              <div className="roadmap-stats__item">
                <div className="roadmap-stats__icon">
                  <Check size={21} />
                </div>

                <div>
                  <span>تمرین‌های تکمیل‌شده</span>
                  <strong>
                    {toFa(completedExercises)} از {toFa(totalExercises)}
                  </strong>
                </div>
              </div>

              <div className="roadmap-stats__item">
                <div className="roadmap-stats__icon">
                  <CalendarDays size={21} />
                </div>

                <div>
                  <span>تعداد مراحل</span>
                  <strong>{toFa(phases.length)} مرحله</strong>
                </div>
              </div>
            </section>

            <div className="my-roadmap__content">
              <section className="roadmap-timeline">
                <div className="roadmap-timeline__heading">
                  <div>
                    <h2>مسیر پیشرفت تو</h2>
                    <p>مراحل یادگیریت رو به ترتیب جلو ببر</p>
                  </div>

                  <span>{toFa(phases.length)} مرحله</span>
                </div>

                <div className="roadmap-timeline__list">
                  {phases.map((phase, phaseIndex) => {
                    const completed =
                      phase.exercises.length > 0 &&
                      phase.exercises.every((exercise) => exercise.completed);

                    const active = phaseIndex === currentStepIndex;

                    const locked =
                      !completed &&
                      (currentStepIndex === -1 ||
                        phaseIndex > currentStepIndex);

                    return (
                      <article
                        className={`roadmap-phase ${
                          completed ? "roadmap-phase--completed" : ""
                        } ${active ? "roadmap-phase--active" : ""} ${
                          locked ? "roadmap-phase--locked" : ""
                        }`}
                        key={phase.id}
                      >
                        <div className="roadmap-phase__marker">
                          {completed ? (
                            <Check size={19} />
                          ) : locked ? (
                            <Lock size={17} />
                          ) : (
                            <span>{toFa(phaseIndex + 1)}</span>
                          )}
                        </div>

                        <div className="roadmap-phase__card">
                          <div className="roadmap-phase__top">
                            <div>
                              <span className="roadmap-phase__number">
                                مرحله {toFa(phaseIndex + 1)}
                              </span>

                              <h3>{phase.title}</h3>

                              {phase.description && <p>{phase.description}</p>}
                            </div>

                            <span
                              className={`roadmap-phase__status ${
                                completed
                                  ? "roadmap-phase__status--completed"
                                  : active
                                    ? "roadmap-phase__status--active"
                                    : "roadmap-phase__status--locked"
                              }`}
                            >
                              {completed
                                ? "تکمیل شده"
                                : active
                                  ? "مرحله فعلی"
                                  : "قفل شده"}
                            </span>
                          </div>

                          <div className="roadmap-phase__meta">
                            <span>
                              <BookOpen size={15} />
                              {toFa(phase.exercises.length)} تمرین
                            </span>

                            {phase.duration && (
                              <span>
                                <Clock3 size={15} />
                                {phase.duration}
                              </span>
                            )}

                            <span>
                              <Check size={15} />
                              {toFa(
                                phase.exercises.filter(
                                  (exercise) => exercise.completed,
                                ).length,
                              )}{" "}
                              انجام‌شده
                            </span>
                          </div>

                          {(active || completed) && (
                            <div className="roadmap-phase__exercises">
                              {phase.exercises.map((exercise) => (
                                <label
                                  id={`exercise-${phase.id}-${exercise.id}`}
                                  className={`roadmap-exercise ${
                                    exercise.completed
                                      ? "roadmap-exercise--completed"
                                      : ""
                                  }`}
                                  key={exercise.id}
                                >
                                  <input
                                    type="checkbox"
                                    checked={exercise.completed}
                                    disabled={
                                      savingExerciseId !== null || !exercise._id
                                    }
                                    onChange={() =>
                                      toggleExercise(phaseIndex, exercise)
                                    }
                                  />

                                  <span className="roadmap-exercise__check">
                                    {exercise.completed && <Check size={13} />}
                                  </span>

                                  <span className="roadmap-exercise__title">
                                    {exercise.title}
                                  </span>

                                  {exercise.duration && (
                                    <span className="roadmap-exercise__duration">
                                      <Clock3 size={14} />
                                      {exercise.duration}
                                    </span>
                                  )}
                                </label>
                              ))}
                            </div>
                          )}

                          {completed && (
                            <div className="roadmap-phase__success">
                              <Check size={16} />
                              این مرحله رو با موفقیت به پایان رسوندی!
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              <aside className="roadmap-next">
                <div className="roadmap-next__heading">
                  <Sparkles size={22} />
                  <h2>قدم بعدی تو</h2>
                </div>

                {allCompleted ? (
                  <div className="roadmap-next__empty">
                    <div className="roadmap-next__icon">
                      <Check size={34} />
                    </div>

                    <h3>تبریک! 🎉</h3>

                    <p>تمام مراحل مسیر یادگیریت رو با موفقیت تکمیل کردی.</p>
                  </div>
                ) : (
                  <>
                    <div className="roadmap-next__card">
                      <span>تمرین بعدی</span>

                      <h3>{nextExercise?.title}</h3>

                      <p>{currentStep?.title}</p>

                      {nextExercise?.duration && (
                        <div className="roadmap-next__duration">
                          <Clock3 size={16} />
                          {nextExercise.duration}
                        </div>
                      )}

                      <button
                        onClick={() => {
                          document
                            .getElementById(
                              `exercise-${currentStep.id}-${nextExercise.id}`,
                            )
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                        }}
                      >
                        مشاهده تمرین
                        <MoveLeft size={17} />
                      </button>
                    </div>

                    <div className="roadmap-next__tip">
                      <Leaf size={22} />
                      <p>هر قدم کوچیک، تو رو به هدفت نزدیک‌تر می‌کنه.</p>
                    </div>
                  </>
                )}
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
