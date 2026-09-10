import Login from '../Auth/Login';
import Register from '../Auth/register';
import '../../css/Auth/Auth.css';


export default function Auth () {
    return (
        <div className="Auth">
            <div className="Auth-form">
                <h2>رهانو</h2>
                <div className="chang-Auth">
                    <button>ورود</button>
                    <button>ثبت‌نام</button>
                </div>
                <Register/>

                </div>
            </div>
       
    )
    
} 