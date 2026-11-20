import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Camera01FreeIcons,
  CheckmarkCircle02Icon,
  Route01FreeIcons,
} from "@hugeicons/core-free-icons";

import DefaultBanner from "../../svg/Profile/rahano-profile-banner.svg";

const API_URL = "http://localhost:3001";

export default function ProfileBanner({ user, onUserUpdate }) {
  const profileInputRef = useRef(null);

  const [uploadedImg, setUploadedImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [savedImg, setSavedImg] = useState(user?.profileImg || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  // هماهنگ کردن عکس با اطلاعات جدید کاربر
  useEffect(() => {
    setSavedImg(user?.profileImg || null);
  }, [user?.profileImg]);

  // ساخت و پاک‌سازی آدرس پیش‌نمایش عکس
  useEffect(() => {
    if (!uploadedImg) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(uploadedImg);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [uploadedImg]);

  // انتخاب عکس پروفایل
  const handleProflieImg = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("فرمت عکس باید JPG، PNG یا WEBP باشد.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("حجم عکس نباید بیشتر از ۵ مگابایت باشد.");
      event.target.value = "";
      return;
    }

    setUploadedImg(file);
    event.target.value = "";
  };

  // لغو تغییر عکس
  const handleCancelUpload = () => {
    setUploadedImg(null);
    setError("");
  };

  // آپلود عکس پروفایل
  const handleUpload = async () => {
    if (!uploadedImg || isUploading) return;

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("profileImg", uploadedImg);

    try {
      const response = await fetch(`${API_URL}/api/profiles/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error === "File Too Large"
            ? "حجم عکس بیشتر از حد مجاز است."
            : data.error === "Invalid File Format"
              ? "فرمت عکس معتبر نیست."
              : data.error === "Unauthorized"
                ? "برای انجام این کار باید وارد حساب کاربری شوی."
                : "آپلود عکس با خطا مواجه شد.",
        );
      }

      if (!data.profileImg) {
        throw new Error("آدرس عکس از سرور دریافت نشد.");
      }

      setSavedImg(data.profileImg);
      setUploadedImg(null);

      // به‌روزرسانی اطلاعات کاربر در کامپوننت والد
      onUserUpdate?.({
        ...user,
        profileImg: data.profileImg,
      });
    } catch (err) {
      console.error("Profile image upload error:", err);
      setError(err.message || "خطایی در آپلود عکس رخ داد.");
    } finally {
      setIsUploading(false);
    }
  };

  const profileImageUrl = savedImg ? `${API_URL}${savedImg}` : DefaultBanner;

  return (
    <section className="profile-banner">
      <div className="profile-content">
        <div className="profile-img">
          <img src={previewUrl || profileImageUrl} alt="profile-image" />

          <input
            ref={profileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleProflieImg}
            hidden
          />

          <button
            type="button"
            className="change-profile-img"
            onClick={() => profileInputRef.current?.click()}
            disabled={isUploading}
            aria-label="تغییر عکس پروفایل"
          >
            <HugeiconsIcon icon={Camera01FreeIcons} size={20} />
          </button>

          {uploadedImg && (
            <div className="profile-upload-actions">
              <button
                type="button"
                onClick={handleCancelUpload}
                disabled={isUploading}
              >
                لغو
              </button>

              <button
                type="button"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? "در حال آپلود..." : "ذخیره عکس"}
              </button>
            </div>
          )}
        </div>

        <div className="profile-details">
          <h2>{user?.name}</h2>

          <div className="user-statistics">
            <div className="stat active-roadmap">
              <HugeiconsIcon icon={Route01FreeIcons} size={20} />
              <span>۱ رودمپ فعال</span>
            </div>

            <div className="stat">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
              <span>مرحله تکمیل شده</span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p className="profile-upload-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
