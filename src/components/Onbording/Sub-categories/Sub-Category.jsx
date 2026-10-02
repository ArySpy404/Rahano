import { MoveLeft } from "lucide-react";
import Category from "./Category";
import '../../../css/Onbording/Sub-Category.css';


export default function SubCategory({ onNext, onBack, category, setCategory }) {
  return (
    <div className="sub-category">
      <h2>می‌خوای تو کدوم حوزه برنامه‌نویسی یاد بگیری؟</h2>
      <p className="favorite-field">
        حوزه‌ای که بیشتر بهش علاقه داری رو انتخاب کن.
      </p>

      <div className="categories">
        <Category
        icon="🧠"
        title="هوش مصنوعی و یادگیری ماشین"
        text="ساخت سیستم های هوشمند و کار با داده"
        onClick={() => setCategory("AI")}
        selected={category === "AI"}
      />

      <Category
        icon="📱"
        title="توسعه اپلیکشن موبایل"
        text="ساخت اپلیکشن برای موبایل"
        onClick={() => setCategory("mobile-app")}
        selected={category === "mobile-app"}
      />

      <Category
        icon="🌐"
        title="توسعه وب"
        text="ساخت وب‌سایت و اپلیکشن های تحت وب"
        onClick={() => setCategory("web")}
        selected={category === "web"}
      />

      <Category
        icon="⚙️"
        title="برنامه نویسی سیستم‌ها"
        text="برنامه‌نویسی سطح پایین و سیستم‌ها"
        onClick={() => setCategory("systems")}
        selected={category === "systems"}
      />

      <Category
        icon="🎮"
        title="بازی سازی"
        text="ساخت بازی و تجربه‌های تعاملی"
        onClick={() => setCategory("game-dev")}
        selected={category === "game-dev"}
      />

      <Category
        icon="🔐"
        title="امنیت سایبری"
        text="امنیت سیستم ها، شبکه‌ها و نرم افزار ها"
        onClick={() => setCategory("security")}
        selected={category === "security"}
      />
      </div>
      

      <div className="links">
        <button className="back" onClick={onBack}>
          قبلی
        </button>
        <button className="next" onClick={onNext} disabled={!category}>
          ادامه
          <MoveLeft color="#FFFFFF" />
        </button>
      </div>
    </div>
  );
}
