import Google from '../../svg/Auth/Google.svg';
import '../../css/Auth/Login.css'
import {HugeiconsIcon} from '@hugeicons/react';
import { LockPasswordIcon, Mail } from '@hugeicons/core-free-icons';




export default function Login () {
    return(
        <div className="Login">
            <div className="form">
                    <label>ایمیل</label>  
                    <div className="input-box">
                        <HugeiconsIcon icon={Mail} color='#794EF8' className='auth-icon' size={22}/>
                        <input type="email" placeholder='rahano@gmail.com'/>
                    </div>
                    
                    <label>رمز عبور</label>
                    <div className="input-box">
                        <HugeiconsIcon icon={LockPasswordIcon} color='#794EF8' className='auth-icon' size={22}/>
                        <input type="password" placeholder='حداقل 8 کاراکتر. از حروف و اعدادانگلیسی و نمادها استفاده کنید'/>
                    </div>
                    

                    <button className='enter' type="submit">ورود</button>
                    <p>یا</p>
                    <button className='login-goole'> <img src={Google} alt="google" />
                        ورود با گوگل
                    </button>
                </div>
        </div>
    )
}