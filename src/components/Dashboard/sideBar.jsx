import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  UserRound,
  Map,
  Settings,
  Headset,
  Sprout,
} from "lucide-react";

import "../../css/Dashboard/sideBar.css";

export default function Sidebar() {
  const menuItems = [
    {
      title: "داشبورد",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "پروفایل",
      path: "/profile",
      icon: UserRound,
    },
    {
      title: "رودمپ من",
      path: "/roadmap",
      icon: Map,
    },
    {
      title: "تنظیمات",
      path: "/settings",
      icon: Settings,
    },
    {
      title: "راهنما و پشتیبانی",
      path: "/support",
      icon: Headset,
    },
  ];

  return (
    <aside className="dashboard-sidebar">
      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={22} strokeWidth={2} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-promo">
        <div className="promo-plant">
          <Sprout size={76} strokeWidth={1.5} />
        </div>

        <h3>با رهانو،</h3>
        <p>مسیرت رو پیدا کن</p>

        <span className="promo-heart">♥</span>
      </div>
    </aside>
  );
}
