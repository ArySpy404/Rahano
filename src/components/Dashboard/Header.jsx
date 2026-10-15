import Profile from "./Profile";
import "../../css/Dashboard/Header.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Onbording/AuthCheck";

export default function Header({ user }) {
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
    <div className="header">
      {message && <p className="res-message">{message}</p>}
      <h3>رهانو</h3>
      <div className="profile-controll">
        <div className="profile-img">
          <Profile />
          {user.name}
        </div>
        <button className="log-out" onClick={handleLogOut}>
          خروج از حساب
        </button>
      </div>
    </div>
  );
}
