import '../../css/Landing/main.css';
import nextStep from '../../svg/Landing/next-step.svg';
import target from '../../svg/Landing/target.svg';
import introduce from '../../svg/Landing/introduce.svg';
import music from '../../svg/Landing/music.svg';
import coding from '../../svg/Landing/coding.svg';
import sketching from '../../svg/Landing/sketching.svg';
import searching from '../../svg/Landing/searching.svg';
import {Heart , MoveLeft} from 'lucide-react';

export default function main () {
    return(
        <main>
        <div className='choises'>
          <h2 className='choise-header'>انتخاب های زیاد،همیشه آزادی نیست.</h2>
          <p className='introduce-road'>وقتی هزار راه جلوت هست،پیدا کردن اولین قدم،<br/> می‌تونه سخت تر از خود مسیر باشه.</p>
        </div>
        <div className="container">
          <h2 className='how-to-work-two'>رهانو چطور کار می‌کنه؟</h2>
          <div className="how-to-work-svg">
            <div className="know-were-are-you global-size">
              <img src={introduce} alt="Were-Are-you"/>
              <h4 className="img-title">بفهم کجایی</h4>
              <p className='img-dTile'>سطح فعلیت،مهارت‌ها،تجربه‌ها و زمانی که در اختیار داری رو مشخص می‌کنیم.</p>
              <div className="step-num">01</div>
            </div> 
            <div className="arrow"><MoveLeft color='#4a4a4b' size={35} className='arrow-left'/></div>
            <div className="target global-size">
              <img src={target} alt="Target" />
              <h4 className="img-title">مقصدت رو مشخص کن</h4>
              <p className='img-dTile'>هدفت رو انتخاب می‌کنی و به رهانو می‌کی که می‌خوای به کجا برسی.</p>
              <div className="step-num">02</div>
            </div>
            <div className="arrow"><MoveLeft color='#4a4a4b' size={35} className='arrow-left'/></div>
            <div className="next-step global-size">
                <img src={nextStep} alt="Next-Step" />
                <h4 className="img-title">قدم بعدی رو پیدا کن</h4>
                <p className='img-dTile'>رهانو مسیر اختصاصی تورو می‌سازه و بهت می‌گه الان روی چی تمرکز کنی.</p>
                <div className="step-num">03</div>
            </div>
          </div>
        </div>
          <div className="roads-for-roadmaps">
              <h2 className='road-for-everyone'>هر مسیری،برای هرکسی.</h2>
            <div className="roads">
              <div className="music global-class">
                <img src={music}  alt="Learn-Music" />
                <h3>موسیقی یاد بگیرم</h3>
                <p>از صفر شروع کنم و مرحله به مرحله پیش برم.</p>
              </div>
              <div className="coding global-class">
                <img src={coding} alt="Coding"/>
                <h3>برنامه نویسی یاد بگیرم</h3>
                <p>مسیر یادگیری مناسب سطح و هدفم رو داشته باشم.</p>
              </div>
              <div className="sketch global-class">
                <img src={sketching} alt="Sketching" />
                <h3>طراح بشم</h3>
                <p>بدونم چه مهارت‌هایی نیاز دارم و از کجا شروع‌کنم.</p>
              </div>
              <div className="dont-know global-class">
                <img src={searching} alt="Searching" />
                <h3>هنوز نمی‌دونم.</h3>
                <p>با کشف علایقم،مسیر مناسب من رو پیشنهاد بده.</p>
              </div>
            </div>
              <p className='trust-sentencs'>رهانو برای هر هدف و هر فرد،یک مسیر متفاوت می‌سازه.
                <Heart  color="#c3f5b0" fill="#c3f5b0" size={18}/>
              </p>
          
          
        </div>
        

      </main>
    )
}