import { BarChart3 } from "lucide-react";

export default function CreditScoreCard() {
  return (
    <section className="credit-card">
      <div className="credit-left">
        <h3>Your Credit Score</h3>

        <div className="score">
          785 <span>/ 900</span>
        </div>

        <h4>Excellent</h4>
        <p>Last updated: 2 days ago</p>
      </div>

      <div className="credit-right">
        <div className="gauge">
          <div className="gauge-arc"></div>
          <div className="needle"></div>
          <div className="needle-dot"></div>
        </div>

        <button>
          <BarChart3 size={18} />
          View Score Details
        </button>
      </div>
    </section>
  );
}