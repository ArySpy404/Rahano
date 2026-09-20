import Profile from "./Profile";
import '../../css/Dashboard/Header.css';

export default function Header () {
    return (
        <div className="header">
            <h3>رهانو</h3>
            <div className="profile-img">
                <Profile/>
            </div>
        </div>
    )
}