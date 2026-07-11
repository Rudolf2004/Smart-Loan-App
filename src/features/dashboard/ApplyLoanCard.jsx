import { useNavigate } from "react-router";
import { ArrowRight, BadgeCheck } from "lucide-react";

export default function ApplyLoanCard() {
  const navigate = useNavigate();

  return (
    <section className="apply-card">
      <div>
        <h2>Apply for a Loan</h2>
        <p>
          Get quick funds for your needs <br />
          with low interest rates.
        </p>

        <button onClick={() => navigate("/loan/personal-info")}>
          Apply Now <ArrowRight size={24} />
        </button>
      </div>

      <div className="apply-art">
        <div className="money-bag">₵</div>
        <BadgeCheck className="check-art" size={42} />
      </div>
    </section>
  );
}