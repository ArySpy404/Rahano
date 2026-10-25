import Header from "./Header";
import Road from "./Road";
import Steps from "./Steps";
import "../../css/Dashboard/Dashboard.css";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Onbording/AuthCheck";
import {
  DisplayValueCategory,
  DisplayValueLearningModel,
  DisplayValueLearningTime,
  DisplayValueLevel,
} from "./DisplayValue";

export default function Dashboard() {
    const [phases, setPhases] = useState([]);
    const [data, setData] = useState({});
    const { user, loading } = useContext(AuthContext);

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

  useEffect(() => {
    async function FetchRoadmap() {
      try {
        const Roadmap = await fetch("http://localhost:3001/api/roadmap", {
          method: "GET",
          credentials: "include",
        });
        if (Roadmap.ok) {
          const result = await Roadmap.json();
          setPhases(result.phases);
        } else {
          console.log(Roadmap.status);
        }
      } catch (err) {
        console.error(err);
      }
    }
    FetchRoadmap();
  }, []);

  
  if (loading === true) {
    return <p>در حال بررسی ورود...</p>;
  }
  if (!user) {
    return <Navigate to="/Auth" replace />;
  }
  const currentIndex = phases.findIndex(
    (phase) => !phase.completionStatus
  )
  const roadmap = {
    title: DisplayValueCategory[data.category],
    level: DisplayValueLevel[data.level],
    hoursPerWeek: DisplayValueLearningTime[data.learningTime],
    steps: 
      phases.map((phase , index) => ({
        id: phase._id,
        number: phase.phaseNumber,
        title: phase.title,
        status: phase.completionStatus ? "completed" : index === currentIndex ? "current" : "locked",
      }))
  };

  const completedCount = roadmap.steps.filter(
    (s) => s.status === "completed",
  ).length;

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

      <Steps steps={roadmap.steps} />
    </div>
  );
}
