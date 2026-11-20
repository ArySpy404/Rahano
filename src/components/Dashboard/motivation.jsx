import { ArrowLeft, Compass, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../../css/Dashboard/Motivation.css";

export default function Motivation({ user }) {
  const navigate = useNavigate();

  return (
    <section className="motivation-section">
      <div className="quote-card">
        <span className="quote-mark" aria-hidden="true">
          “
        </span>

        <h3>
          تو از پسش برمیای، <bdi>{user.name}</bdi>!
        </h3>

        <Heart size={20} fill="currentColor" />
      </div>

      <div className="guidance-banner">
        <Compass
          className="guidance-icon"
          size={130}
          strokeWidth={1.2}
          aria-hidden="true"
        />

        <div className="guidance-content">
          <h3>
            به آینده فکر کن،
            <br />
            ما اینجاییم تا کمکت کنیم.
          </h3>

          <button onClick={() => navigate("/support")}>
            مشاهده راهنما
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
