import { useNavigate } from "react-router";
import { useLoanApplication } from "../../../contexts/useLoanApplication";
import { XCircle } from "lucide-react";
import "./result.css";

export default function RejectedResultPage() {
  const navigate = useNavigate();
  const { prediction, resetApplication } = useLoanApplication();

  const result = prediction || {
    decision: "REJECTED",
    confidence: 42,
    message: "Unfortunately, your loan application did not meet our lending criteria.",
    probabilities: { APPROVED: 12, CONDITIONALLY_APPROVED: 10, REJECTED: 78 },
    score: 42,
    details: [],
  };

  const handleReturn = () => navigate("/dashboard");
  const handleNew = () => {
    resetApplication();
    navigate("/loan/personal-info");
  };

  return (
    <main className="result-page">
      <div className="result-card">
        <h1>Loan Assessment Result</h1>
        <p className="result-sub">{result.message}</p>

        <div className="result-top">
          <div className="result-badge" style={{ background: '#fff0f0', color: '#c93a3a' }}>
            <XCircle size={48} />
            <div className="badge-text">Not Approved</div>
          </div>

          <div className="risk-box">
            <div className="risk-score">{result.score} / 100</div>
            <div className="risk-meta">
              <div>Risk Score</div>
              <div className="risk-level">High Risk</div>
            </div>
          </div>
        </div>

        <div className="assessment-list">
          {(result.details && result.details.length ? result.details : [
            { label: 'Employment Stability', status: 'passed' },
            { label: 'Income Verification', status: 'failed' },
            { label: 'Credit Score', status: 'passed' },
            { label: 'Debt Level (DTI)', status: 'failed' },
            { label: 'Collateral Evaluation', status: 'insufficient' },
            { label: 'Guarantor Assessment', status: 'weak' },
          ]).map((it) => (
            <div key={it.label} className="assessment-row">
              <div className="assessment-label">{it.label}</div>
              <div className={`assessment-status ${it.status}`}>{it.status === 'passed' ? 'Passed' : it.status === 'failed' ? 'Failed' : it.status}</div>
            </div>
          ))}
        </div>

        <div className="recommendation">
          <h3>Recommendation</h3>
          <p>We recommend improving the following before reapplying: increase monthly income, reduce existing debt, provide stronger collateral, or add a stronger guarantor.</p>
        </div>

        <div className="result-actions">
          <button className="btn-outline" onClick={handleReturn}>Return to Dashboard</button>
          <button className="btn-primary" onClick={handleNew}>Start New Application</button>
        </div>
      </div>
    </main>
  );
}
