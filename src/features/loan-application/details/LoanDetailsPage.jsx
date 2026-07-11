import {
  ArrowLeft,
  ShieldCheck,
  Info,
  LogOut,
  ArrowRight,
} from "lucide-react";
import "./loanDetail.css";
import { useNavigate } from "react-router";
import { useLoanApplication } from "../../../contexts/useLoanApplication";

const steps = [
  "Personal Info",
  "Employment",
  "Financial",
  "Loan Details",
  "Collateral",
  "Guarantor",
  "Review",
];

export default function LoanDetailPage() {
  const navigate = useNavigate();
  const { application, updateField } = useLoanApplication();

  const goNext = () => {
    if (
      !application.loan_amount ||
      !application.loan_purpose ||
      !application.loan_type ||
      !application.repayment_period
    ) {
      return;
    }

    navigate("/loan/collateral-info");
  };

  return (
    <main className="loan-detail-page">
      <div className="loan-detail-container">
        <header className="loan-detail-header">
          <button className="back-btn" onClick={() => navigate("/loan/financial-info")}>
            <ArrowLeft size={30} />
          </button>

          <h1>Loan Application</h1>

          <div className="secure-text">
            <ShieldCheck size={20} />
            <span>Secure & Safe</span>
          </div>
        </header>

        <section className="loan-detail-steps">
          <div className="steps-line" />

          {steps.map((step, index) => (
            <div className="step-item" key={step}>
              <div className={`step-circle ${index <= 3 ? "active" : ""}`}>
                {index + 1}
              </div>
              <p className={index <= 3 ? "active" : ""}>{step}</p>
            </div>
          ))}
        </section>

        <section className="loan-detail-title-section">
          <div>
            <p className="step-count">Step 4 of 7</p>
            <h2>Loan Details</h2>
            <p className="title-desc">Tell us how much you need and how you plan to use it.</p>
          </div>

          <div className="loan-detail-art">$</div>
        </section>

        <section className="loan-detail-form-card">
          <FormGroup label="Loan Amount (GHS)" required>
            <input
              className="input-box"
              type="number"
              min="1000"
              max="100000"
              placeholder="e.g. 25000"
              value={application.loan_amount}
              onChange={(event) => updateField("loan_amount", event.target.value)}
            />
          </FormGroup>

          <div className="loan-range">
            <input
              type="range"
              min="1000"
              max="100000"
              step="500"
              value={application.loan_amount || "25000"}
              onChange={(event) => updateField("loan_amount", event.target.value)}
            />
            <div className="range-values">
              <span>1,000</span>
              <span>100,000</span>
            </div>
          </div>

          <div className="form-grid">
            <FormGroup label="Loan Purpose" required>
              <select
                className="input-box"
                value={application.loan_purpose}
                onChange={(event) => updateField("loan_purpose", event.target.value)}
              >
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="personal">Personal</option>
                <option value="home">Home</option>
                <option value="car">Vehicle</option>
              </select>
            </FormGroup>

            <FormGroup label="Loan Type" required>
              <select
                className="input-box"
                value={application.loan_type}
                onChange={(event) => updateField("loan_type", event.target.value)}
              >
                <option value="term_loan">Term Loan</option>
                <option value="working_capital">Working Capital</option>
                <option value="salary_advance">Salary Advance</option>
                <option value="asset_finance">Asset Finance</option>
              </select>
            </FormGroup>
          </div>

          <div className="form-grid">
            <FormGroup label="Repayment Period" required>
              <select
                className="input-box"
                value={application.repayment_period}
                onChange={(event) => updateField("repayment_period", event.target.value)}
              >
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
                <option value="18">18 Months</option>
                <option value="24">24 Months</option>
                <option value="36">36 Months</option>
              </select>
            </FormGroup>

            <FormGroup label="Preferred Disbursement Date">
              <input
                className="input-box"
                type="date"
                value={application.disbursement_date}
                onChange={(event) => updateField("disbursement_date", event.target.value)}
              />
            </FormGroup>
          </div>

          <FormGroup label="How will this loan help you?">
            <textarea
              className="input-box tall"
              maxLength={250}
              placeholder="Briefly explain how you plan to use the loan."
              value={application.loan_notes}
              onChange={(event) => updateField("loan_notes", event.target.value)}
            />
            <p className="character-count">{application.loan_notes.length}/250 characters</p>
          </FormGroup>

          <div className="info-box">
            <Info size={26} />
            <div>
              <h3>Important Information</h3>
              <p>
                These details help us match the application with the right loan product
                and repayment plan.
              </p>
            </div>
          </div>

          <div className="loan-detail-actions">
            <button className="save-btn" onClick={() => navigate("/dashboard")}>
              Save & Exit
              <LogOut size={24} />
            </button>

            <button className="next-btn" onClick={goNext}>
              Next: Collateral Information
              <ArrowRight size={28} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function FormGroup({ label, required, children }) {
  return (
    <div className="form-group">
      <label>
        {label} {required && <span>*</span>}
      </label>
      {children}
    </div>
  );
}
