import Navbar from "../Landing/Navbar";
import "../../css/General/about.css";
import HeroCertificate from "../../svg/General/hero-passport (2).svg";
import Mountain from "../../svg/General/mountain-full.svg";
import Mission from "../../svg/General/mission-target.svg";
import Support from "../../svg/General/icon-support-heart.svg";
import Growth from "../../svg/General/icon-growth.svg";
import HonestyShield from "../../svg/General/icon-honesty-shield.svg";
import personalization from "../../svg/General/icon-personalization.svg";
import Footer from "../Landing/footer";

export default function About() {
  return (
    <div className="about">
      <div className="about-body">
        <Navbar />

        <section className="about-header">
          <img src={HeroCertificate} alt="Rahano-certificate" />

          <div className="certificate">
            <p>شناسنامه رهانو</p>
          </div>

          <h1>
            <span>رهانو</span>؛ همراه مسیر تو
          </h1>
          <p className="about-description">
            ما اینجا هستیم تا بهت کمک کنیم با شناخت بهتر خودت، مسیر یادگیری و
            رشدت رو هوشمندانه انتخاب کنی.
          </p>
        </section>

        <section className="story">
          <div className="our-story">
            <p>داستان‌ما</p>
          </div>
          <h2>چرا رهانو ساخته‌شد؟</h2>
          <p className="story-des">
            ما دیدیم خیلی‌ها بین هزاران دوره و آموزش، نمی‌دونن از کجا شروع
            کنن،چه‌مسیری رو برن و واقعا به چی برسن. <br />
            برای همین، رهانو متولد شد! <br />
            تا یادگیری‌رو شخصی‌سازی کنه و مسیرت رو روشن کنه.
          </p>

          <img src={Mountain} alt="story-mountain" />
        </section>

        <section className="mission">
          <div className="our-mission">
            <p>ماموریت‌ما</p>
          </div>
          <img src={Mission} alt="goal&mission" />
          <h2>ماموریت رهانو چیه؟</h2>
          <p>
            ما می‌خوایم یادگیری رو برای همه ساده‌تر، هدفمندتر و دسترس پذیرتر
            کنیم؛ <br />
            تا هرکسی بتونه قدم های واقعی برای ساختن آینده‌ای بهتر برداره.
          </p>
        </section>

        <section className="value">
          <div className="our-value">
            <p>ارزش‌های ما</p>
          </div>
          <h2>چه چیزهایی برامون مهمه؟</h2>
          <div className="value-container">
            <div className="support value-card">
              <img src={Support} alt="support" />

              <p>حمایت واقعی</p>
              <p>همیشه کنارت هستیم.</p>
            </div>

            <div className="growth">
              <img src={Growth} alt="growth value-card" />

              <p>رشد مداوم</p>
              <p>باهم بهتر می‌شیم.</p>
            </div>

            <div className="personalization value-card">
              <img src={personalization} alt="personalization" />

              <p>شخصی‌سازی عمیق</p>
              <p>مسیر اختصاصی تو.</p>
            </div>

            <div className="honesty-shield value-card">
              <img src={HonestyShield} alt="honesty-shield" />

              <p>واقع بینی و صداقت</p>
              <p>با رویکردی شفاف و کاربردی.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
