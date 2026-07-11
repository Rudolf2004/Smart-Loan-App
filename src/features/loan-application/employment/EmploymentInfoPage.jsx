import {
  ArrowLeft,
  ShieldCheck,
  BriefcaseBusiness,
  Info,
  LogOut,
  ArrowRight,
} from "lucide-react";
import "./employmentInfo.css";
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

export default function EmploymentInfoPage() {
  const navigate = useNavigate();
  const { application, updateField } = useLoanApplication();
  const goNext = () => {
    if (application.employment_status && application.years_employed !== "") {
      navigate("/loan/financial-info");
    }
  };

  return (
    <main className="employment-page">
      <div className="employment-container">
        <header className="employment-header">
          <button className="back-btn" onClick={() => navigate("/loan/personal-info")}>
            <ArrowLeft size={30} />
          </button>

          <h1>Loan Application</h1>

          <div className="secure-text">
            <ShieldCheck size={20} />
            <span>Secure & Safe</span>
          </div>
        </header>

        <section className="employment-steps">
          <div className="steps-line" />

          {steps.map((step, index) => (
            <div className="step-item" key={step}>
              <div
                className={`step-circle ${
                  index === 0 || index === 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </div>
              <p className={index === 0 || index === 1 ? "active" : ""}>
                {step}
              </p>
            </div>
          ))}
        </section>

        <section className="employment-title-section">
          <div>
            <p className="step-count">Step 2 of 7</p>
            <h2>Employment Information</h2>
            <p className="title-desc">Tell us about your employment.</p>
          </div>

          <div className="employment-art">
            <BriefcaseBusiness size={92} />
          </div>
        </section>

        <section className="employment-form-card">
          <FormGroup label="Employment Status" required>
            <select
              className="input-box"
              value={application.employment_status}
              onChange={(event) => {
                const value = event.target.value;
                updateField("employment_status", value);
                if (value === "unemployed") {
                  updateField("years_employed", "0");
                }
              }}
            >
              <option value="employed">employed</option>
              <option value="self_employed">self_employed</option>
              <option value="unemployed">unemployed</option>
            </select>
          </FormGroup>

          <FormGroup label="Years Employed" required>
            <input
              className="input-box"
              type="number"
              min="0"
              value={application.years_employed}
              onChange={(event) => updateField("years_employed", event.target.value)}
              disabled={application.employment_status === "unemployed"}
            />
          </FormGroup>

          <div className="info-box">
            <Info size={26} />
            <div>
              <h3>Why we need this information</h3>
              <p>
                Your employment details help us assess your income stability and
                ability to repay the loan.
              </p>
            </div>
          </div>

          <div className="employment-actions">
            <button className="save-btn" onClick={() => navigate("/dashboard")}>
              Save & Exit
              <LogOut size={24} />
            </button>

            <button className="next-btn" onClick={goNext}>
              Next: Financial Information
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
