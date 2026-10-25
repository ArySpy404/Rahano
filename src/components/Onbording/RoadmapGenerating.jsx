import { HugeiconsIcon } from "@hugeicons/react";
import GeneratingChoises from "./GeneratingChoises";
import { Route } from "@hugeicons/core-free-icons";
import "../../css/Onbording/RoadmapGenerating.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function RoadmapGenerating() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const hastarted = useRef(false);

  useEffect(() => {
    if (hastarted.current) return;
    let timer;
    hastarted.current = true;
    async function Redirect() {
      try {
        const redirect = await fetch("http://localhost:3001/api/roadmap", {
          method: "POST",
          credentials: "include",
        });
        if (redirect.status === 502) {
          setMessage("خطا در پردازش پاسخ سرویس");
        } else if (redirect.status === 409) {
          setMessage(
            "رودمپ از قبل وجود داره؛ می‌تونی به داشبوردت بری و رودمپ موجود رو دریافت کنی.",
          );
          timer = setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        } else if (!redirect.ok) {
          console.log("Server Response:", redirect);
          setMessage("سرور خطا داده!");
        } else if (redirect.ok) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error(err);
        setMessage("تو اتصال به سرور به مشکل خوردیم!");
      }
    }

    Redirect();
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="roadmap-generating">
      {message && <p role="status">{message}</p>}
      <div className="logo-container">
        <div className="logo">
          <HugeiconsIcon icon={Route} />
        </div>
      </div>

      <h2>داریم مسیرتو میسازیم...</h2>
      <p className="generate-text">
        بر اساس هدف، سطح‌فعلی و زمانی که بهمون گفتی، رهانو داره یه مسیر مخصوص
        خودت طراحی می‌کنه. چند لحظه صبر کن.
      </p>
      <div className="road-choises">
        <GeneratingChoises text="تحلیل هدف و سطح فعلی" />

        <GeneratingChoises text="چیدمان مراحل و منابع" />

        <GeneratingChoises text="آماده سازی داشبورد" />
      </div>
    </div>
  );
}
