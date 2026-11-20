import { Fragment, useEffect, useState } from "react";
import Navbar from "../Dashboard/Navbar";
import Sidebar from "../Dashboard/sideBar";
import ProfileBanner from "./profileBanner";
import ProfileInfo from "./profileInfo";
import "../../css/Profile/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function FetchUser() {
      try {
        const userData = await fetch("http://localhost:3001/api/me", {
          method: "GET",
          credentials: "include",
        });
        if (userData.ok) {
          const result = await userData.json();
          setUser(result);
        } else {
          console.log(userData.status);
        }
      } catch (err) {
        console.error(err);
      }
    }

    FetchUser();
  }, []);

  return (
    <div className="profile">
      <Navbar />

      <Sidebar />

      <main className="profile-main">
        {user && (
          <Fragment>
            <ProfileBanner user={user} />
            <ProfileInfo user={user} />
          </Fragment>
        )}
      </main>
    </div>
  );
}
