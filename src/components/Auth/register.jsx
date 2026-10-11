import { HugeiconsIcon } from "@hugeicons/react";
import { LockPasswordIcon, Mail } from "@hugeicons/core-free-icons";
import Google from "../../svg/Auth/Google.svg";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Auth/register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
        repeatPassword,
        
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
          setMessage("ثبت‌نام با موفقیت ایجاد شد");
          navigate("/waitingPage");
        } else if (result.data.email) {
          setMessage("ایمیلت تکراریه!");
        } else if (result.data.repeatPassword) {
          setMessage("رمزعبورت با تکرار رمز یکی نیست!");
        } else {
          setMessage("ثبت‌نام ناموفق بود");
        }
      })
        .catch((err) => {
          console.log(err)
          setMessage("نتونستیم با سرور ارتباط بگیریم!")
        })
      
  };

  return (
    <div className="register">
      {message && <p className="res-message">{message}</p>}

      <div className="form">
        <form className="form" onSubmit={handleSubmit}>
          <label>نام کاربری</label>
          <div className="input-box">
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
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
          <label>تکرار رمز عبور</label>
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
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          <button className="enter" type="submit">
            ثبت‌نام
          </button>
          <p>یا</p>
          <button className="login-goole">
            {" "}
            <img src={Google} alt="google" />
            ثبت‌نام با گوگل
          </button>
        </form>
      </div>
    </div>
  );
}
