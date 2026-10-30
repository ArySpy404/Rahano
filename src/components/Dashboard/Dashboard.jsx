import Header from "./Header";
import Road from "./Road";
import Steps from "./Steps";
import "../../css/Dashboard/Dashboard.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Onbording/AuthCheck";
import {
  DisplayValueCategory,
  DisplayValueLearningModel,
  DisplayValueLearningTime,
  DisplayValueLevel,
} from "./DisplayValue";
import WaitingPage from "../Auth/Waiting-page";

export default function Dashboard() {
  const [phases, setPhases] = useState([]);
  const [data, setData] = useState({});
  const { user, loading } = useContext(AuthContext);
  const [roadmapStatus, setRoadmapStatus] = useState("loading");
  const navigate = useNavigate();

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
      const Roadmap = await fetch("http://localhost:3001/api/roadmap", {
        method: "GET",
        credentials: "include",
      });
      if (Roadmap.ok) {
        const result = await Roadmap.json();
        setRoadmapStatus("exists");
        setPhases(result.phases);
      } else if (Roadmap.status === 404) {
        setRoadmapStatus("missing");
      } else {
        console.log(Roadmap.status);
        setRoadmapStatus("error");
      }
    } catch (err) {
      console.error(err);
      setRoadmapStatus("error");
    }
  }, []);

  useEffect(() => {
    FetchRoadmap();
  }, [FetchRoadmap]);

  if (loading === true) {
    return <p>در حال بررسی ورود...</p>;
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
          <button onClick={() => navigate("/onboarding")}>ساخت رودمپ من</button>
        </div>
      </div>
    );
  } else if (roadmapStatus === "error") {
    return (
      <div className="roadmap-error">
        <div className="roadmap-error-detail">
          <h1>یه مشکلی پیش اومده!</h1>
          <p>نتونستیم رودمپ‌ات رو دریافت کنیم</p>
          <button onClick={() => FetchRoadmap()}>تلاش دوباره</button>
        </div>
      </div>
    );
  }

  const currentIndex = phases.findIndex((phase) => !phase.completionStatus);
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
    (s) => s.status === "completed",
  ).length;

  const handleExerciseChange = async (exerciseId, completed) => {
    const res = await fetch(
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

    if (!res.ok) {
      const errorData = await res.json();

      console.error("Status:", res.status);
      console.error("Error:", errorData.error);

      return;
    }
    setPhases((prevPhases) =>
      prevPhases.map((phase) => {
        const updatedExercises = phase.exercises.map((exercise) => {
          if (exercise._id === exerciseId) {
            return {
              ...exercise,
              completed,
            };
          }

          return exercise;
        });

        const completionStatus = updatedExercises.every(
          (exercise) => exercise.completed === true,
        );

        return {
          ...phase,
          exercises: updatedExercises,
          completionStatus,
        };
      }),
    );
  };

  return (
    <div className="dashboard">
      <Header user={user} />
      <Road
        title={roadmap.title}
        level={roadmap.level}
        hoursPerWeek={roadmap.hoursPerWeek}
        completed={completedCount}
        total={roadmap.steps.length}
        plan={roadmap.title}
        range={roadmap.level}
        time={roadmap.hoursPerWeek}
        currentStep={completedCount}
        totalSteps={roadmap.steps.length}
      />

      <p className="steps-title">مراحل مسیر</p>

      <Steps
        steps={roadmap.steps}
        handleExerciseChange={handleExerciseChange}
      />
    </div>
  );
}
