import "../../css/General/HowItWorks.css";
import Navbar from "../Landing/Navbar";
import Road from "../../svg/General/1-hero-roadmap.svg";
import ProfileCard from "../../svg/General/2-profile-card.svg";
import Analisys from "../../svg/General/4-analysis-laptop.svg";
import Map from "../../svg/General/5-map-journey.svg";
import Rocket from "../../svg/General/6-rocket.svg";
import Footer from "../Landing/footer";

export default function HowItWorks() {
  return (
    <div className="how-it-works">
      <div className="how-it-works-body">
        <Navbar />

        <section className="h-i-w-header">
          <div className="learning-road">
            <p>مسیر یادگیری در رهانو</p>
          </div>
          <h1>
            از کجا شروع میکنی؛ <span>تا کجا می‌تونی بری؟</span>
          </h1>
          <p className="road-des">
            با چند قدم ساده، مسیر یادگیری شخصی سازی شده‌ات رو بساز و قدم‌به‌قدم
            به هدفت نزدیک‌تر شو.
          </p>
          <img src={Road} alt="road" />
        </section>

        <div className="steps">
          <div className="step-1">
            <div className="number">1</div>
            <h2>شناخت تو</h2>
            <p>
              ابتدا درباره‌ی خودت بهم بگو، اهدافت چیه؟ <br />
              چه مهارت‌هایی داری؟ و چه محدودیت‌هایی داری؟ <br />
              با چند سوال ساده، تصویر واصحی از خودت به‌ما می‌دی.
            </p>
            <img
              src={ProfileCard}
              alt="profile-card
"
            />
          </div>
          <div className="step-2">
            <div className="number">2</div>
            <img src={Analisys} alt="analisys" />
            <h2>تحلیل اطلاعات</h2>
            <p>
              حالا رهانو اطلاعاتت رو بررسی می‌کنه؛ <br />
              مهارت‌هات علایقت و هدفت رو تحلیل می‌کنه تا بهترین مسیر رو برات
              پیدا کنه.
            </p>
          </div>
          <div className="step-3">
            <div className="number">3</div>
            <h2>ساخت مسیر</h2>
            <p>
              براساس تحلیل‌ها، یه رودمپ یادگیری اختصاصی برات می‌سازیم، شامل
              فازهای هدفمند، تمرین های مناسب و پیشنهادهای کاربردی.
            </p>
            <img src={Map} alt="map" />
          </div>
          <div className="step-4">
            <div className="number">4</div>
            <img src={Rocket} alt="rocket" />
            <h2>شروع‌یادگیری</h2>
            <p>
              حالا وقتشه! قدم‌به‌قدم مسیرت رو طی کن، <br />
              پیشرفتت رو ببین و در مسیر رشد بمون.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
