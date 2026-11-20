import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Onbording/AuthCheck";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification } from "@hugeicons/core-free-icons";
import "../../css/Dashboard/Navbar.css";
import Profile from "./Profile";
import { LogOut, UserRound } from "lucide-react";

export default function Navbar() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleLogOut = () => {
    fetch("http://localhost:3001/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json().then((data) => {
          return {
            ok: res.ok,
            data: data,
          };
        });
      })
      .then((result) => {
        if (result.ok) {
          setUser(null);
          setTimeout(() => {
            navigate("/");
          }, 1500);
          setMessage("با موفقیت از حسابت خارج شدی:)");
        } else {
          setMessage("خطا در خارج شدن از حساب!");
        }
      })
      .catch((err) => {
        setMessage("نتونستیم با سرور ارتباط برقرار کنیم!");
        console.error(err);
      });
  };
  return (
    <header className="dashboard-navbar">
      <div className="navbar-brand">
        <span>رهانو</span>
        <span className="brand-star">✦</span>
      </div>

      <div className="navbar-actions">
        <button
          className="navbar-profile"
          onClick={() => navigate("/profile")}
          aria-label="پروفایل"
        >
          <UserRound size={22} />
        </button>

        <button className="navbar-logout" onClick={handleLogOut}>
          خروج از حساب
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
