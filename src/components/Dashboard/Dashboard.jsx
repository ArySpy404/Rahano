import Header from "./Header";
import Road from "./Road";
import Steps from "./Steps";
import '../../css/Dashboard/Dashboard.css';

export default function Dashboard() {
    const roadmap = {
        title: "Frontend Development",
        level: "تازه‌کار",
        hoursPerWeek: 5,
        steps: [
            { id: 1, title: "مبانی HTML و CSS", status: "completed" },
            { id: 2, title: "جاوا اسکریپت پایه", status: "current" },
            { id: 3, title: "آشنایی با React", status: "locked" },
        ],
    };

    const completedCount = roadmap.steps.filter((s) => s.status === "completed").length;

    return (
        <div className="dashboard">
            <Header />
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
            />
        </div>
    );
}