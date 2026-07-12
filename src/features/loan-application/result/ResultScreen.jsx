import { ArrowLeft, BriefcaseBusiness, ChartNoAxesColumn, Check, CircleAlert, Gauge, Home, House, Lightbulb, Printer, Star, Users, WalletCards, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useLoanApplication } from "../../../contexts/useLoanApplication";
import "./result.css";

const labels = [
  [BriefcaseBusiness, "Employment Stability"], [WalletCards, "Income Verification"],
  [Gauge, "Credit Score"], [ChartNoAxesColumn, "Debt Level (DTI)"],
  [House, "Collateral Evaluation"], [Users, "Guarantor Assessment"],
];

export default function ResultScreen({ approved }) {
  const navigate = useNavigate();
  const { prediction, resetApplication } = useLoanApplication();
  const score = Math.round(prediction?.score ?? prediction?.confidence ?? (approved ? 84 : 42));
  const fallback = approved ? ["passed","passed","passed","passed","passed","passed"] : ["passed","failed","passed","failed","insufficient","weak"];
  const details = prediction?.details?.length ? prediction.details : labels.map(([, label], i) => ({ label, status: fallback[i] }));
  const startNew = () => { resetApplication(); navigate("/loan/personal-info"); };

  return <main className={`result-page ${approved ? "approved" : "rejected"}`}><article className="result-card">
    <header className="result-nav"><button onClick={() => navigate("/dashboard")} aria-label="Back"><ArrowLeft /></button><h1>Loan Assessment Result</h1><button aria-label="Print result" onClick={() => window.print()}><Printer /></button></header>
    <section className="result-hero"><div className="confetti" aria-hidden>◆ · ◆ · ◆</div><div className="result-symbol">{approved ? <Check /> : <X />}</div><h2>{approved ? "Approved!" : "Not Approved"}</h2><p>{approved ? "Congratulations! Your loan application has been approved." : "Unfortunately, your loan application did not meet our lending criteria."}</p></section>
    <section className="risk-box"><div><small>Risk Score</small><strong>{score} <span>/ 100</span></strong></div><div><small>Risk Level</small><b>{approved ? "Low Risk" : "High Risk"}</b></div></section>
    <section className="assessment-panel"><h3>Assessment Summary</h3>{details.map((item, index) => { const Icon=labels[index]?.[0] || CircleAlert; const status=String(item.status).toLowerCase(); return <div className="assessment-row" key={item.label}><Icon className="row-icon"/><strong>{item.label}</strong><span className={status}>{status === "passed" ? <Check/> : status === "weak" ? <CircleAlert/> : <X/>}{status[0]?.toUpperCase()+status.slice(1)}</span><i>›</i></div> })}</section>
    <section className="recommendation"><div className="recommend-icon">{approved ? <Star/> : <Lightbulb/>}</div><div><h3>Recommendation</h3>{approved ? <p>Your application meets our lending criteria.<br/>We will contact you shortly with the next steps.</p> : <><p>We recommend improving the following before reapplying:</p><ul><li>Increase your monthly income</li><li>Reduce existing debt</li><li>Provide stronger collateral</li><li>Add a stronger guarantor</li></ul></>}</div></section>
    <div className="result-actions"><button className="btn-primary" onClick={() => navigate("/dashboard")}><Home/>Return to Dashboard</button><button className="btn-outline" onClick={startNew}><span>＋</span>Start New Application</button></div>
  </article></main>;
}
