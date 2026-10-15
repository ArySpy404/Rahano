import Google from "../../svg/Auth/Google.svg";
import "../../css/Auth/Login.css";
import { HugeiconsIcon } from "@hugeicons/react";
import { LockPasswordIcon, Mail } from "@hugeicons/core-free-icons";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Onbording/AuthCheck";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
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
          setUser(result.data);
          setMessage("با موفقیت ورود کردی");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        } else if (result.data.email) {
          setMessage("حساب کاربری‌با این ایمیل وجود نداره!");
        } else if (result.data.password) {
          setMessage("پسوردت اشتباهه!");
        } else {
          setMessage("نمی‌تونی وارد اکانتت بشی:(");
        }
      })
      .catch((err) => {
        setMessage("نتونستیم با سرور ارتباط برقرار کنیم!");
        console.error(err);
      });
  };

  return (
    <div className="Login">
      {message && <p className="res-message">{message}</p>}

      <div className="form">
        <form className="form" onSubmit={handleSubmit}>
          <label>ایمیل</label>
          <div className="input-box">
            <HugeiconsIcon
              icon={Mail}
              color="#794EF8"
              className="auth-icon"
              size={22}
            />
            <input
              type="email"
              placeholder="rahano@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label>رمز عبور</label>
          <div className="input-box">
            <HugeiconsIcon
              icon={LockPasswordIcon}
              color="#794EF8"
              className="auth-icon"
              size={22}
            />
            <input
              type="password"
              placeholder="حداقل 8 کاراکتر. از حروف و اعدادانگلیسی و نمادها استفاده کنید"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="enter" type="submit">
            ورود
          </button>
          <p>یا</p>
          <button className="login-goole">
            {" "}
            <img src={Google} alt="google" />
            ورود با گوگل
          </button>
        </form>
      </div>
    </div>
  );
}
