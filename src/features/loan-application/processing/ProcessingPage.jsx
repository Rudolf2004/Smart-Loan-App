import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useLoanApplication } from "../../../contexts/useLoanApplication";
import { submitLoanApplication } from "../../../services/loanApi";
import MobileShell from "../../../components/layout/MobileShell";
import { FileText } from "lucide-react";
import "./processing.css";

const defaultSteps = [
  "Verifying personal information",
  "Checking employment details",
  "Calculating financial ratios",
  "Evaluating collateral",
  "Validating guarantor",
  "Finalizing assessment",
];

export default function ProcessingPage() {
  const navigate = useNavigate();
  const { application, setPrediction, setError, setLoading } = useLoanApplication();

  const [localError, setLocalError] = useState("");

  const evaluate = useCallback(async (isActive = () => true) => {
    setLoading(true);
    setError("");
    setLocalError("");

    try {
      const response = await submitLoanApplication(application);
      if (!isActive()) return;
      setPrediction(response);
      setLoading(false);
      const decision = (response && response.decision) ? response.decision.toString().toUpperCase() : "";
      if (decision === "APPROVED" || decision === "CONDITIONALLY_APPROVED") {
        navigate("/loan/result/approved");
      } else {
        navigate("/loan/result/rejected");
      }
    } catch (err) {
      if (!isActive()) return;
      const msg = err?.message || "Unable to evaluate the application.";
      setError(msg);
      setLocalError(msg);
      setLoading(false);
      // do not auto-navigate back to review — show error and let user choose
    }
  }, [application, navigate, setError, setLoading, setPrediction]);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      void evaluate(() => active);
    }, 0);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [evaluate]);

  const progress = useMemo(() => 72, []); // target percent shown in mock
  const [displayProgress, setDisplayProgress] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // animate progress up to target while evaluating
  useEffect(() => {
    let mounted = true;
    const step = () => {
      setDisplayProgress((p) => {
        if (!mounted) return p;
        const diff = progress - p;
        if (diff <= 0) return p;
        // increment by a fraction to ease to the target
        const inc = Math.max(1, Math.round(diff * 0.12));
        const next = Math.min(progress, p + inc);
        return next;
      });
    };

    const id = setInterval(step, 300);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [progress]);

  // seconds timer
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <MobileShell>
      <main className="processing-page">
        <div className="processing-card">
          <div className="processing-header">
            <div className="processing-icon"><FileText size={22} /></div>
            <h1>Loan Application</h1>
            <p className="processing-sub">Evaluating Your Application</p>
          </div>

          <div className="processing-body">
            <div className="progress-ring">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <defs>
                  <linearGradient id="ringGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#0757df" />
                  </linearGradient>
                </defs>

                <path className="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />

                <path className="circle"
                  strokeDasharray={`${displayProgress}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />

                <circle cx="18" cy="18" r="9.6" className="circle-inner" />

                <text x="18" y="18" className="percentage" dominantBaseline="middle" alignmentBaseline="middle" textAnchor="middle">
                  <tspan className="percent-num">{displayProgress}</tspan>
                  <tspan className="percent-sign" dy="-6">%</tspan>
                </text>
              </svg>

              <div className="progress-caption">Processing...</div>
              <div className="processing-timer">{seconds}s</div>
            </div>

            <ul className="processing-steps">
              {defaultSteps.map((s, i) => (
                <li key={s} className={i < 3 ? "done" : i === 3 ? "in-progress" : "pending"}>
                  <div className="step-dot-wrap">
                    {i < 3 ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#0c8f45" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : i === 3 ? (
                      <div className="step-circle-active" />
                    ) : (
                      <div className="step-circle-pending" />
                    )}
                  </div>
                  <div>
                    <strong>{s}</strong>
                    <p className="step-sub">{i < 3 ? "Completed" : i === 3 ? "In Progress" : "Pending"}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="note">This may take a few seconds. Please avoid closing the app.</p>

            {localError ? (
              <div className="processing-error">
                <p style={{ color: "#c93a3a", margin: "8px 0" }}>{localError}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="primary-outline" onClick={() => evaluate()}>Retry</button>
                  <button className="primary-btn" onClick={() => navigate('/loan/review')}>Back to Review</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </MobileShell>
  );
}
