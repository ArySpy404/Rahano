import { BookOpen } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { LockKeyhole, User } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DisplayValueCategory,
  DisplayValueLearningModel,
  DisplayValueLearningTime,
  DisplayValueLevel,
} from "../Dashboard/DisplayValue";

export default function ProfileInfo({ user }) {
  const [learningData, setLearningData] = useState(null);

  useEffect(() => {
    async function FetchLearningData() {
      try {
        const LearningData = await fetch(
          "http://localhost:3001/api/onboarding",
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (LearningData.ok) {
          const result = await LearningData.json();
          setLearningData(result);
        } else {
          console.log(LearningData.status);
        }
      } catch (err) {
        console.error(err);
      }
    }

    FetchLearningData();
  }, []);

  const userLearning = {
    category: learningData
      ? DisplayValueCategory[learningData.category] || "نامشخص"
      : "درحال دریافت اطلاعات...",
    level: learningData
      ? DisplayValueLevel[learningData.level] || "نامشخص"
      : "درحال دریافت اطلاعات...",
    time: learningData
      ? DisplayValueLearningTime[learningData.learningTime] || "نامشخص"
      : "درحال دریافت اطلاعات...",
    LearningModel: learningData
      ? DisplayValueLearningModel[learningData.learningModel] || "نامشخص"
      : "درحال دریافت اطلاعات...",
  };

  console.log("Last Login:", user.lastLogin);
console.log("Account Status:", user.status);
  return (
    <div className="profile-info">
      <div className="personal-data">
        <span>
          <User />
        </span>
        <h3>اطلاعات شخصی</h3>

        <div className="personals">
          <p>نام‌کاربری :</p>
          <p>{user.name}</p>

          <p>ایمیل :</p>
          <p>{user.email}</p>
        </div>

        <div className="about-user">
          <h4>درباره‌من</h4>
          <p>{user.bio || "هنوز چیزی درباره‌خودت ننوشتی!"}</p>
        </div>
      </div>

      <div className="learning-data">
        <span>
          <HugeiconsIcon icon={BookOpen} />
        </span>
        <h1>اطلاعات یادگیری</h1>

        <div className="choosed-skill">
          <p>مهارت انتخاب‌شده:</p>
          <span className="learning-category">{userLearning.category}</span>
        </div>

        <div className="user-level">
          <p>سطح فعلی:</p>
          <span className="current-level">{userLearning.level}</span>
        </div>

        <div className="user-time">
          <p>زمان آزاد درهفته:</p>
          <span className="free-time">{userLearning.time}</span>
        </div>

        <div className="user-LModel">
          <p>سبک یادگیری:</p>
          <span className="learning-model">{userLearning.LearningModel}</span>
        </div>
      </div>

      <div className="accout-security">
        <span>
          <LockKeyhole />
        </span>
        <h1>امنیت حساب</h1>

        <div className="last-login">
          <p>آخرین ورود:</p>
          <p>
            {user.lastLogin
              ? new Date(user.lastLogin).toLocaleDateString("fa-IR")
              : "هنوز وارد نشده"}
          </p>
        </div>

        <div className="account-status">
          <p>وضعیت حساب:</p>
          <span className="account-stat">
            {user.status === "active"
              ? "فعال"
              : user.status === "inactive"
                ? "غیرفعال"
                : "محدود شده"}
          </span>
        </div>
      </div>
    </div>
  );
}
