import profile from '../../svg/Dashboard/user-rounded-svgrepo-com (3).svg';
import '../../css/Dashboard/Profile.css';

export default function Profile () {
    return (
        <div className="profile">
            <img src={profile} alt="Profile-Image" />
        </div>
    )
}