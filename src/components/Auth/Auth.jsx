import Login from '../Auth/Login';
import Register from '../Auth/register';
import '../../css/Auth/Auth.css';
import { useState } from 'react';

export default function Auth () {
    const [isLogin , setIsLogin] = useState(true);

    return (
        <div className="Auth">
            <div className="Auth-form">
                <h2>رهانو</h2>
                <div className="chang-Auth">
                    <button onClick={() => setIsLogin(true)}>ورود</button>
                    <button onClick={() => setIsLogin(false)}>ثبت‌نام</button>
                </div>
                {isLogin ? <Login/> : <Register/>}

                </div>
            </div>
       
    )
    
} 