
import Sidebar from "./sideBar";
import "../../css/Dashboard/Dashboard.css";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Onbording/AuthCheck";
import {
  DisplayValueCategory,
  DisplayValueLearningTime,
  DisplayValueLevel,
} from "./DisplayValue";
import WaitingPage from "../Auth/Waiting-page";
import UserStatus from "./userStatus";
import WelcomeBanner from "./welcomeBanner";
import Navbar from "./Navbar";
import Shortcuts from "./shortcuts";
import Roadmap from "./roadmap";
import RecentActivity from "./recentActivity";
import Motivation from "./motivation";
import confetti from "canvas-confetti";

export default function Dashboard() {
  const [phases, setPhases] = useState([]);
  const [data, setData] = useState({});
  const { user, loading } = useContext(AuthContext);
  const [roadmapStatus, setRoadmapStatus] = useState("loading");
  const navigate = useNavigate();

  const previousCompletion = useRef(null);

  useEffect(() => {
    async function FetchOnboarding() {
      try {
        const roadData = await fetch("http://localhost:3001/api/onboarding", {
          method: "GET",
          credentials: "include",
        });

        if (roadData.ok) {
          const result = await roadData.json();
          setData(result);
        } else {
          console.log(roadData.status);
        }
      } catch (err) {
        console.error(err);
      }
    }

    FetchOnboarding();
  }, []);

  const FetchRoadmap = useCallback(async () => {
    setRoadmapStatus("loading");

    try {
      const response = await fetch("http://localhost:3001/api/roadmap", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();

        setRoadmapStatus("exists");
        setPhases(result.phases);
      } else if (response.status === 404) {
        setRoadmapStatus("missing");
      } else {
        console.log(response.status);
        setRoadmapStatus("error");
      }
    } catch (err) {
      console.error(err);
      setRoadmapStatus("error");
    }
  }, []);

  useEffect(() => {
    if (loading || !user) return;

    FetchRoadmap();
  }, [FetchRoadmap, loading, user]);

  const currentIndex = phases.findIndex(
    (phase) => !phase.completionStatus,
  );

  const roadmap = {
    title: DisplayValueCategory[data.category],
    level: DisplayValueLevel[data.level],
    hoursPerWeek: DisplayValueLearningTime[data.learningTime],
    steps: phases.map((phase, index) => ({
      id: phase._id,
      number: phase.phaseNumber,
      title: phase.title,
      status: phase.completionStatus
        ? "completed"
        : index === currentIndex
          ? "current"
          : "locked",
      description: phase.description,
      exercises: phase.exercises,
    })),
  };

  const completedCount = roadmap.steps.filter(
    (step) => step.status === "completed",
  ).length;

  const totalExercises = phases.reduce(
    (total, phase) => total + phase.exercises.length,
    0,
  );

  const completedExercises = phases.reduce(
    (total, phase) =>
      total +
      phase.exercises.filter((exercise) => exercise.completed).length,
    0,
  );

  const allExercisesCompleted =
    totalExercises > 0 && completedExercises === totalExercises;

  useEffect(() => {
    if (roadmapStatus !== "exists") return;

    if (previousCompletion.current === null) {
      previousCompletion.current = allExercisesCompleted;
      return;
    }

    if (!allExercisesCompleted || previousCompletion.current) {
      previousCompletion.current = allExercisesCompleted;
      return;
    }

    previousCompletion.current = true;

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
  }, [allExercisesCompleted, roadmapStatus]);

  const handleExerciseChange = async (exerciseId, completed) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/roadmap/exercises/${exerciseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ completed }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        console.error("Status:", response.status);
        console.error("Error:", errorData.error);

        return;
      }

      setPhases((prevPhases) =>
        prevPhases.map((phase) => {
          const updatedExercises = phase.exercises.map((exercise) => {
            if (String(exercise._id) === String(exerciseId)) {
              return {
                ...exercise,
                completed,
              };
            }

            return exercise;
          });

          const completionStatus =
            updatedExercises.length > 0 &&
            updatedExercises.every(
              (exercise) => exercise.completed === true,
            );

          return {
            ...phase,
            exercises: updatedExercises,
            completionStatus,
          };
        }),
      );
    } catch (err) {
      console.error("Exercise update error:", err);
    }
  };

  if (loading === true) {
    return (
      <div className="auth-check">
        <p>در حال بررسی ورود...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/Auth" replace />;
  }

  if (roadmapStatus === "loading") {
    return <WaitingPage />;
  }

  if (roadmapStatus === "missing") {
    return (
      <div className="no-roadmap">
        <div className="no-roadmap-detail">
          <h1>هنوز رودمپی نداری!</h1>
          <p>برای شروع، مسیر یادگیری مخصوص خودت رو بساز.</p>
          <button onClick={() => navigate("/onboarding")}>
            ساخت رودمپ من
          </button>
        </div>
      </div>
    );
  }

  if (roadmapStatus === "error") {
    return (
      <div className="roadmap-error">
        <div className="roadmap-error-detail">
          <h1>یه مشکلی پیش اومده!</h1>
          <p>نتونستیم رودمپ‌ات رو دریافت کنیم</p>
          <button onClick={() => FetchRoadmap()}>
            تلاش دوباره
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar />

      <Sidebar />

      <main className="dashboard-main">
        <WelcomeBanner user={user} />

        <UserStatus
          currentStep={completedCount}
          totalSteps={roadmap.steps.length}
          learningTime={
            DisplayValueLearningTime[data.learningTime] || "—"
          }
        />

        <div className="dashboard-grid">
          <Shortcuts />

          <Roadmap
            steps={roadmap.steps}
            handleExerciseChange={handleExerciseChange}
          />

          <Motivation user={user} />

          <RecentActivity steps={roadmap.steps} />
        </div>
      </main>
    </div>
  );
}
