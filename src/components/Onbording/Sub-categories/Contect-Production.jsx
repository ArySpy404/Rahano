import { MoveLeft } from "lucide-react";
import "../../../css/Onbording/contect-production.css";
import Category from "./Category";

export default function ContectProdution({
  onNext,
  onBack,
  category,
  setCategory,
}) {
  return (
    <div className="contect-production">
      <h2>چه نوع محتوایی می‌خوای بسازی؟</h2>
      <p className="favorite-text">
        نوع‌محتوایی که بیشتر دوست‌داری بسازی رو انتخاب کن
      </p>

      <div className="categories">
        <Category
          icon="📹"
          title="ساخت ویدیو"
          text="فیلم‌برداری و ساخت ویدیو برای یوتیوب و شبکه‌ها"
          onclick={() => setCategory("")}
          selected={category === ""}
        />

        <Category
          icon="✂️"
          title="تدوین و ادیت"
          text="برش، ریتم وافکت"
          onclick={() => setCategory("edit")}
          selected={category === "edit"}
        />

        <Category
          icon="🎙️"
          title="پادکست"
          text="ایده،ضبط و انتشار"
          onclick={() => setCategory("podcast")}
          selected={category === "podcast"}
        />

        <Category
          icon="✍️"
          title="نویسندگی"
          text="نوشتن مقاله، داستان و متن تبلیغاتی"
          onclick={() => setCategory("writeing")}
          selected={category === "writeing"}
        />

        <Category
          icon="🔴"
          title="استریم"
          text="پخش زنده وساختن جامعه‌ی مخاطب"
          onclick={() => setCategory("stream")}
          selected={category === "stream"}
        />

        <Category
          icon="📲"
          title="شبکه‌های اجتماعی"
          text="ساخت محتوای کوتاه و رشد صفحه"
          onclick={() => setCategory("social-media")}
          selected={category === "social-media"}
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
