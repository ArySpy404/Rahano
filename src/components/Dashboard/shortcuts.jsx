import { Trophy, Send, BookOpen, Settings, Zap } from "lucide-react";

import { useNavigate } from "react-router-dom";
import "../../css/Dashboard/Shortcuts.css";

export default function Shortcuts() {
  const navigate = useNavigate();

  const shortcuts = [
    {
      title: "مشاهده رتبه‌بندی",
      icon: Trophy,
      path: "/leaderboard",
    },
    {
      title: "ادامه مسیر یادگیری",
      icon: Send,
      path: "/roadmap",
    },
    {
      title: "مشاهده تمرین‌ها",
      icon: BookOpen,
      path: "/roadmap",
    },
    {
      title: "تنظیمات حساب",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <section className="shortcuts-section">
      <div className="shortcuts-header">
        <Zap size={23} />
        <h2>میانبرها</h2>
      </div>

      <div className="shortcuts-grid">
        {shortcuts.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="shortcut-item"
              onClick={() => navigate(item.path)}
            >
              <Icon size={27} strokeWidth={2.3} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
