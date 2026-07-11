import {
  ArrowLeft,
  ShieldCheck,
  Info,
  LogOut,
  ArrowRight,
} from "lucide-react";
import "./PersonalInfo.css";
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

export default function PersonalInfoPage() {
  const navigate = useNavigate();
  const { application, updateField } = useLoanApplication();
  const goNext = () => {
    if (!application.age || !application.income || !application.credit_score) {
      return;
    }
    navigate("/loan/employment-info");
  };

  return (
    <main className="personal-page">
      <div className="personal-container">
        <header className="personal-header">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={30} />
          </button>

          <h1>Loan Application</h1>

          <div className="secure-text">
            <ShieldCheck size={20} />
            <span>Secure & Safe</span>
          </div>
        </header>

        <section className="steps-section">
          <div className="steps-line" />

          {steps.map((step, index) => (
            <div className="step-item" key={step}>
              <div className={`step-circle ${index === 0 ? "active" : ""}`}>
                {index + 1}
              </div>
              <p className={index === 0 ? "active" : ""}>{step}</p>
            </div>
          ))}
        </section>

        <section className="personal-title-section">
          <div>
            <p className="step-count">Step 1 of 7</p>
            <h2>Personal Information</h2>
            <p className="title-desc">
              Please provide your basic personal details.
            </p>
          </div>

          <div className="title-art">🛡️</div>
        </section>

        <section className="personal-form-card">
          <div className="form-grid">
            <FormGroup label="Age" required>
              <input
                className="input-box"
                type="number"
                value={application.age}
                onChange={(event) => updateField("age", event.target.value)}
                placeholder="Enter age"
              />
            </FormGroup>

            <FormGroup label="Annual Income" required>
              <input
                className="input-box"
                type="number"
                value={application.income}
                onChange={(event) => updateField("income", event.target.value)}
                placeholder="Enter income"
              />
            </FormGroup>
          </div>

          <FormGroup label="Credit Score" required>
            <input
              className="input-box"
              type="number"
              value={application.credit_score}
              onChange={(event) => updateField("credit_score", event.target.value)}
              placeholder="300-850"
            />
          </FormGroup>

          <div className="info-box">
            <Info size={26} />
            <div>
              <h3>Why we need this information</h3>
              <p>
                This information helps us verify your identity and assess your
                loan application in accordance with banking regulations.
              </p>
            </div>
          </div>

          <div className="personal-actions">
            <button className="save-btn" onClick={() => navigate("/dashboard")}>
              Save & Exit
              <LogOut size={24} />
            </button>

           <button className="next-btn" onClick={goNext}>
              Next: Employment Info
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
