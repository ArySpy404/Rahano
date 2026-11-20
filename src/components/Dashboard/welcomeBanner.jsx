import Banner from "../../svg/Dashboard/rahano-banner (3).svg";
import "../../css/Dashboard/WelcomeBanner.css";

export default function WelcomeBanner({ user }) {

  return (
    <section className="welcome-banner">
      <img src={Banner} alt="" className="banner-background" />

      <div className="welcome-content">
        <h1>
          سلام <bdi>{user.name}</bdi>!
          <span className="welcome-spark" aria-hidden="true">
            ✦
          </span>
        </h1>

        <h3>خوش برگشتی به رهانو</h3>

        <p>هر قدم کوچیک، تورو به آینده‌ای که می‌خوای نزدیک‌تر می‌کنه.</p>
      </div>
    </section>
  );
}
