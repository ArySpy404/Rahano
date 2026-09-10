import { HugeiconsIcon } from "@hugeicons/react";import { LockPasswordIcon, Mail } from '@hugeicons/core-free-icons';import Google from '../../svg/Auth/Google.svg';

export default function Register (){
    return (
        <div className="register">
            <div className="form">
                    <label>نام کاربری</label>
                    <div className="input-box">
                        <input type="text" />
                    </div>
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
                    <label>تکرار رمز عبور</label>
                    <div className="input-box">
                        <HugeiconsIcon icon={LockPasswordIcon} color='#794EF8' className='auth-icon' size={22}/>
                        <input type="password" placeholder='حداقل 8 کاراکتر. از حروف و اعدادانگلیسی و نمادها استفاده کنید'/>
                    </div>
                    

                    <button className='enter' type="submit">ثبت‌نام</button>
                    <p>یا</p>
                    <button className='login-goole'> <img src={Google} alt="google" />
                        ثبت‌نام با گوگل
                    </button>
                </div>
        </div>
    )
}