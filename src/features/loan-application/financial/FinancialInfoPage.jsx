import {
  ArrowLeft,
  ShieldCheck,
  Info,
  LogOut,
  ArrowRight,
} from "lucide-react";
import "./financialInfo.css";
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

export default function FinancialInfoPage() {
  const navigate = useNavigate();
  const { application, updateField } = useLoanApplication();
  const goNext = () => {
    if (application.loan_amount && application.existing_debt !== "") {
      navigate("/loan/details");
    }
  };

  return (
    <main className="financial-page">
      <div className="financial-container">
        <header className="financial-header">
          <button className="back-btn" onClick={() => navigate("/loan/employment-info")}>
            <ArrowLeft size={30} />
          </button>

          <h1>Loan Application</h1>

          <div className="secure-text">
            <ShieldCheck size={20} />
            <span>Secure & Safe</span>
          </div>
        </header>

        <section className="financial-steps">
          <div className="steps-line" />

          {steps.map((step, index) => (
            <div className="step-item" key={step}>
              <div className={`step-circle ${index <= 2 ? "active" : ""}`}>
                {index + 1}
              </div>
              <p className={index <= 2 ? "active" : ""}>{step}</p>
            </div>
          ))}
        </section>

        <section className="financial-title-section">
          <div>
            <p className="step-count">Step 3 of 7</p>
            <h2>Financial Information</h2>
            <p className="title-desc">
              Please provide details about your income, expenses and existing
              financial obligations.
            </p>
          </div>

          <div className="financial-art">💰</div>
        </section>

        <section className="financial-form-card">
          <div className="form-grid">
            <FormGroup label="Requested Loan Amount" required>
              <input className="input-box" type="number" value={application.loan_amount} onChange={(event) => updateField("loan_amount", event.target.value)} />
            </FormGroup>

            <FormGroup label="Existing Debt" required>
              <input className="input-box" type="number" value={application.existing_debt} onChange={(event) => updateField("existing_debt", event.target.value)} />
            </FormGroup>
          </div>

          <FormGroup label="Loan Purpose" required>
            <select className="input-box" value={application.loan_purpose} onChange={(event) => updateField("loan_purpose", event.target.value)}>
              <option value="business">business</option>
              <option value="education">education</option>
              <option value="personal">personal</option>
              <option value="home">home</option>
              <option value="car">car</option>
            </select>
          </FormGroup>

          <div className="info-box">
            <Info size={26} />
            <div>
              <h3>Why we need this information</h3>
              <p>
                Your financial information helps us evaluate your repayment
                ability and determine the most suitable loan offer for you.
              </p>
            </div>
          </div>

          <div className="financial-actions">
            <button className="save-btn" onClick={() => navigate("/dashboard")}>
              Save & Exit
              <LogOut size={24} />
            </button>

            <button className="next-btn" onClick={goNext}>
              Next: Loan Details
              <ArrowRight size={28} />
            </button>

          </div>
        </section>
      </div>
    </main>
  );
}

function FormGroup({ label, required, info, children }) {
  return (
    <div className="form-group">
      <label>
        {label} {required && <span>*</span>}{" "}
        {info && <Info size={15} className="label-info" />}
      </label>
      {children}
    </div>
  );
}
