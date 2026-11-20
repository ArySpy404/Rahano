import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="landing-nav">
      <div className="right">
        <span className="name-logo">رهانو</span>
      </div>
      <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "×" : "☰"}
      </button>
      <div className={isMenuOpen ? "left open" : "left"}>
        <NavLink
          to="/about"
          className={({ isActive }) => `about-us ${isActive ? "active" : ""}`}
        >
          درباره‌ما
        </NavLink>
        <NavLink
          to="/how-it-works"
          className={({ isActive }) =>
            `how-to-work ${isActive ? "active" : ""}`
          }
        >
          چگونه کار می‌کند
        </NavLink>
        <Link to="/Auth" className="login-signup">
          ورود/ثبت نام
        </Link>
      </div>
    </nav>
  );
}
