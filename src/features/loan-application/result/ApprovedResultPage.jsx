import { useNavigate } from "react-router";
import { useLoanApplication } from "../../../contexts/useLoanApplication";
import { CheckCircle2 } from "lucide-react";
import "./result.css";

export default function ApprovedResultPage() {
  const navigate = useNavigate();
  const { prediction, resetApplication } = useLoanApplication();

  const result = prediction || {
    decision: "APPROVED",
    confidence: 84,
    message: "Congratulations! Your loan application has been approved.",
    probabilities: { APPROVED: 84, CONDITIONALLY_APPROVED: 10, REJECTED: 6 },
    score: 84,
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
          <div className="result-badge" style={{ background: '#ecfff3', color: '#0c8f45' }}>
            <CheckCircle2 size={48} />
            <div className="badge-text">Approved!</div>
          </div>

          <div className="risk-box">
            <div className="risk-score">{result.score} / 100</div>
            <div className="risk-meta">
              <div>Risk Score</div>
              <div className="risk-level">Low Risk</div>
            </div>
          </div>
        </div>

        <div className="assessment-list">
          {(result.details && result.details.length ? result.details : [
            { label: 'Employment Stability', status: 'passed' },
            { label: 'Income Verification', status: 'passed' },
            { label: 'Credit Score', status: 'passed' },
            { label: 'Debt Level (DTI)', status: 'passed' },
            { label: 'Collateral Evaluation', status: 'passed' },
            { label: 'Guarantor Assessment', status: 'passed' },
          ]).map((it) => (
            <div key={it.label} className="assessment-row">
              <div className="assessment-label">{it.label}</div>
              <div className={`assessment-status ${it.status}`}>{it.status === 'passed' ? 'Passed' : it.status}</div>
            </div>
          ))}
        </div>

        <div className="recommendation">
          <h3>Recommendation</h3>
          <p>Your application meets our lending criteria. We will contact you shortly with the next steps.</p>
        </div>

        <div className="result-actions">
          <button className="btn-outline" onClick={handleReturn}>Return to Dashboard</button>
          <button className="btn-primary" onClick={handleNew}>Start New Application</button>
        </div>
      </div>
    </main>
  );
}
