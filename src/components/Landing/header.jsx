import { Link, NavLink } from "react-router-dom";
import "../../css/Landing/header.css";
import { MoveLeft } from "lucide-react";
import Road from "../../svg/Landing/rahano-road.svg";
import { useState } from "react";
import Navbar from "./Navbar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="landing-header">
      <Navbar/>

      <div className="hero">
        <img src={Road} alt="Rahano" />
        <div className="introduce">
          <h1>نمی‌دونی از کجا شروع کنی؟</h1>
          <h3 className="road">
            <span className="name-color">رهانو </span>مسیرت رو پیدا میکنه.
          </h3>
          <p className="d-tile">
            هدفت،شرایطت و چیزهایی که بلدی رو بگو؛
            <br />
            رهانو کمک می‌کنه بفهمی قدم بعدی چیه.
          </p>
          <button className="find-my-road">
            <Link to="/onboarding" className="find-my-road-link">
              مسیرم رو پیدا کن
            </Link>
            <MoveLeft color="#FFFFFF" />
          </button>

          <p className="start-free">رایگان شروع کن،بدون نیاز به کارت بانکی:)</p>
        </div>
      </div>
    </header>
  );
}
