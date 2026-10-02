import Category from "./Category";
import "../../../css/Onbording/language.css";
import { MoveLeft } from "lucide-react";

export default function Language({ onNext, onBack, category, setCategory }) {
  return (
    <div className="language">
      <h2>کدوم زبان رو می‌خوای یادبگیری؟</h2>
      <p className="favorite-field">زبان مورد نظرت رو انتخاب کن</p>

      <div className="categories">
        <Category
          icon="EN"
          title="انگلیسی"
          onClick={() => setCategory("english")}
          selected={category === "english"}
        />

        <Category
          icon="DE"
          title="آلمانی"
          onClick={() => setCategory("german")}
          selected={category === "german"}
        />

        <Category
          icon="FR"
          title="فرانسوی"
          onClick={() => setCategory("french")}
          selected={category === "french"}
        />

        <Category
          icon="TR"
          title="ترکی‌استانبولی"
          onClick={() => setCategory("turkish")}
          selected={category === "turkish"}
        />

        <Category
          icon="KO"
          title="کره‌ای"
          onClick={() => setCategory("")}
          selected={category === ""}
        />

        <Category
          icon="ES"
          title="اسپانیایی"
          onClick={() => setCategory("espanish")}
          selected={category === "espanish"}
        />

        <Category
          icon="AR"
          title="عربی"
          onClick={() => setCategory("arabic")}
          selected={category === "arabic"}
        />

        <Category
          icon="JA"
          title="ژاپنی"
          onClick={() => setCategory("japanese")}
          selected={category === "japanese"}
        />

        <Category
          icon="RU"
          title="روسی"
          onClick={() => setCategory("russian")}
          selected={category === "russian"}
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
