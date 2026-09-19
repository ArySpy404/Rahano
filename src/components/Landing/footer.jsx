import { Link } from 'react-router-dom';
import '../../css/Landing/footer.css'
import {MoveLeft , Leaf, Heart} from 'lucide-react';

export default function footer () {
    return(
        <footer>
        <div className="footer">
          <h1 className='you-shold-not-know-all-the-road'>لازم نیست کل مسیر رو بدونی.</h1>
          <h1 className="know-next-step">فقط <span>قدم بعدی</span> رو پیدا کن.</h1>
          <button className='find-my-road-two'> 
            <Link to='/onboarding' className='find-my-road-link'>مسیرم رو پیدا کن</Link>
        <MoveLeft color='#FFFFFF'/>
          </button>
          <p>رایگان شروع کن.بدون نیاز به کارت بانکی.
            <Leaf size={15} color='#8ec977' fill='#8ec977'/>
          </p>
        </div>

        <div className="brand">
          <h3 className='name-logo'>رهانو</h3>
          <p><Heart size={15} color='#8ec977' fill='#8ec977'/>
            مسیر یادگیری،شغلی و رشد شخصی تو.
          </p>
        </div>
        
      </footer>
    )
}