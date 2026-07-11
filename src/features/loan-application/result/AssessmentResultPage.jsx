import { useNavigate } from "react-router";
import { useLoanApplication } from "../../../contexts/useLoanApplication";
import "./result.css";

const decisionMeta = {
  APPROVED: { title: "Approved", accent: "#0c8f45", bg: "#ecfff3" },
  CONDITIONALLY_APPROVED: { title: "Conditionally Approved", accent: "#b36b00", bg: "#fff8e8" },
  REJECTED: { title: "Not Approved", accent: "#c93a3a", bg: "#fff0f0" },
};

export default function AssessmentResultPage() {
  const navigate = useNavigate();
  const { prediction, resetApplication } = useLoanApplication();

  const result = prediction || {
    decision: "REJECTED",
    confidence: 0,
    message: "No prediction available.",
    probabilities: { APPROVED: 0, CONDITIONALLY_APPROVED: 0, REJECTED: 0 },
    details: [],
  };

  const meta = decisionMeta[result.decision] || decisionMeta.REJECTED;

  const assessmentItems = result.details && result.details.length > 0 ? result.details : [
    { label: "Employment Stability", status: "passed" },
    { label: "Income Verification", status: result.decision === "REJECTED" ? "failed" : "passed" },
    { label: "Credit Score", status: "passed" },
    { label: "Debt Level (DTI)", status: result.decision === "REJECTED" ? "failed" : "passed" },
    { label: "Collateral Evaluation", status: result.decision === "REJECTED" ? "insufficient" : "passed" },
    { label: "Guarantor Assessment", status: "passed" },
  ];

  const handleReturn = () => navigate("/dashboard");
  const handleNew = () => {
    resetApplication();
    navigate("/loan/personal-info");
  };

  return (
    <main className="result-page">
      <div className="result-card">
        <h1>Loan Assessment Result</h1>
        <p className="result-sub">{result.decision === "APPROVED" ? "Congratulations! Your loan application has been approved." : result.message}</p>

        <div className="result-top">
          <div className="result-badge" style={{ background: meta.bg, color: meta.accent }}>
            {result.decision === "APPROVED" ? <span className="big-check">✓</span> : <span className="big-x">✕</span>}
            <div className="badge-text">{meta.title}</div>
          </div>

          <div className="risk-box">
            <div className="risk-score">{result.score ?? result.confidence}</div>
            <div className="risk-meta">
              <div>Risk Score</div>
              <div className="risk-level">{result.decision === "APPROVED" ? "Low Risk" : "High Risk"}</div>
            </div>
          </div>
        </div>

        <div className="assessment-list">
          {assessmentItems.map((it) => (
            <div key={it.label} className="assessment-row">
              <div className="assessment-label">{it.label}</div>
              <div className={`assessment-status ${it.status}`}>{it.status === "passed" ? "Passed" : it.status === "failed" ? "Failed" : it.status}</div>
            </div>
          ))}
        </div>

        <div className="recommendation">
          <h3>Recommendation</h3>
          <p>
            {result.decision === "APPROVED"
              ? "Your application meets our lending criteria. We will contact you shortly with the next steps."
              : "We recommend improving the following before reapplying: increase monthly income, reduce existing debt, provide stronger collateral, or add a stronger guarantor."}
          </p>
        </div>

        <div className="result-actions">
          <button className="btn-outline" onClick={handleReturn}>Return to Dashboard</button>
          <button className="btn-primary" onClick={handleNew}>{result.decision === "APPROVED" ? "Start New Application" : "Start New Application"}</button>
        </div>
      </div>
    </main>
  );
}
