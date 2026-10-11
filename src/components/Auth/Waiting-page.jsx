import { Compass } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import '../../css/Auth/Waiting-page.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function WaitingPage () {
    const navigate = useNavigate();
    useEffect(() => {
            const timer = setTimeout(() => {
              navigate("/onboarding", { replace: true });
            }, 2000);

            return () => clearTimeout(timer);
          }, [navigate]);
    return (
        <div className="waiting-page-background">
            <div className="waiting-page">
                <div className="w-ring">
                <div className="w-icon">
                    <HugeiconsIcon icon={Compass} color="#5F2DE6" style={{width : "50px" , height : "50px"}}/>
                </div>
            </div>
            <h2>داریم حسابتو آماده می‌کنیم</h2>
                <p>چند لحظه صبر کن تا بتونی مسیرتو بسازی...</p>
            </div>
        </div>
    )
}