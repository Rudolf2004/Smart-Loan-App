import {
  ArrowLeft,
  ShieldCheck,
  Plus,
  Info,
  LogOut,
  ArrowRight,
} from "lucide-react";
import "./guarantorInfo.css";
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

export default function GuarantorInfoPage() {
  const navigate = useNavigate();
  const { application, updateField } = useLoanApplication();
  const goNext = () => {
    navigate("/loan/review");
  };

  return (
    <main className="guarantor-page">
      <div className="guarantor-container">
        <header className="guarantor-header">
          <button className="back-btn" onClick={() => navigate("/loan/collateral-info")}>
            <ArrowLeft size={30} />
          </button>

          <h1>Loan Application</h1>

          <div className="secure-text">
            <ShieldCheck size={20} />
            <span>Secure & Safe</span>
          </div>
        </header>

        <section className="guarantor-steps">
          <div className="steps-line" />

          {steps.map((step, index) => (
            <div className="step-item" key={step}>
              <div className={`step-circle ${index <= 5 ? "active" : ""}`}>
                {index + 1}
              </div>
              <p className={index <= 5 ? "active" : ""}>{step}</p>
            </div>
          ))}
        </section>

        <section className="guarantor-title-section">
          <div>
            <p className="step-count">Step 6 of 7</p>
            <h2>Guarantor Information</h2>
            <p className="title-desc">
              Provide details of at least one guarantor. <br />
              You can add up to 2 guarantors.
            </p>
          </div>

          <div className="guarantor-art">🤝</div>
        </section>

        <section className="guarantor-form-card">
          <div className="guarantor-card-header">
            <h3>Guarantor 1</h3>
          </div>

          <div className="form-grid">
            <FormGroup label="Annual Income" required>
              <input className="input-box" type="number" value={application.guarantor1_income} onChange={(event) => updateField("guarantor1_income", event.target.value)} />
            </FormGroup>

            <FormGroup label="Employment Status" required>
              <select className="input-box" value={application.guarantor1_employment} onChange={(event) => updateField("guarantor1_employment", event.target.value)}>
                <option value="employed">employed</option>
                <option value="self_employed">self_employed</option>
                <option value="unemployed">unemployed</option>
                <option value="not_applicable">not_applicable</option>
              </select>
            </FormGroup>
          </div>

          <FormGroup label="Valid Identification" required>
            <select className="input-box" value={application.guarantor1_valid_id} onChange={(event) => updateField("guarantor1_valid_id", event.target.value)}>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </FormGroup>
        </section>

        <button className="add-guarantor-btn">
          <Plus size={26} />
          Add Another Guarantor (Max 2)
        </button>

        <div className="info-box guarantor-info-box">
          <Info size={26} />
          <div>
            <h3>Important Information</h3>
            <p>
              A guarantor agrees to repay the loan if you are unable to do so.
              Please ensure the information provided is accurate.
            </p>
          </div>

          <div className="handshake-art">🤝</div>
        </div>

        <div className="guarantor-actions">
          <button className="save-btn" onClick={() => navigate("/dashboard")}>
            Save & Exit
            <LogOut size={24} />
          </button>

            <button className="next-btn" onClick={goNext}>
            Next: Review Application
            <ArrowRight size={28} />
          </button>
        </div>
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
