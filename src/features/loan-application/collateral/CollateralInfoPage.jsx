import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  User,
  Upload,
  Info,
  LogOut,
  ArrowRight,
  ChevronDown,
  Circle,
  CircleDot,
  MessageSquareText,
} from "lucide-react";
import "./collateralInfo.css";
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

export default function CollatrialInfoPAGE() {
  const navigate = useNavigate();
  const { application, updateField } = useLoanApplication();
  const goNext = () => {
    navigate("/loan/guarantor-info");
  };

  return (
    <main className="collatrial-page">
      <div className="collatrial-container">
        <header className="collatrial-header">
          <button className="back-btn" onClick={() => navigate("/loan/details")}>
            <ArrowLeft size={30} />
          </button>

          <h1>Loan Application</h1>

          <div className="secure-text">
            <ShieldCheck size={20} />
            <span>Secure & Safe</span>
          </div>
        </header>

        <section className="collatrial-steps">
          <div className="steps-line" />

          {steps.map((step, index) => (
            <div className="step-item" key={step}>
              <div className={`step-circle ${index <= 4 ? "active" : ""}`}>
                {index + 1}
              </div>
              <p className={index <= 4 ? "active" : ""}>{step}</p>
            </div>
          ))}
        </section>

        <section className="collatrial-title-section">
          <div>
            <p className="step-count">Step 5 of 7</p>
            <h2>Collateral Information</h2>
            <p className="title-desc">
              Tell us about any asset you want to use as collateral for this
              loan.
            </p>
          </div>

          <div className="collatrial-art">🏠</div>
        </section>

        <section className="collatrial-form-card">
          <FormGroup label="Do you have any asset to use as collateral?">
            <div className="radio-grid">
              <RadioBox active={application.collateral === "yes"} label="Yes, I have collateral" onClick={() => updateField("collateral", "yes")} />
              <RadioBox active={application.collateral === "no"} label="No, I have no collateral" onClick={() => updateField("collateral", "no")} />
            </div>
          </FormGroup>

          <div className="form-grid">
            <FormGroup label="Estimated Value (GHS)" required>
              <input className="input-box" type="number" value={application.collateral_value} onChange={(event) => updateField("collateral_value", event.target.value)} disabled={application.collateral === "no"} />
            </FormGroup>
          </div>

          <div className="form-grid">
            <FormGroup label="Ownership Status" required>
              <Input icon={<User />} value="Sole Ownership" dropdown />
            </FormGroup>

            <FormGroup label="Supporting Document" required>
              <UploadInput />
            </FormGroup>
          </div>

          <FormGroup label="Any existing encumbrance on the asset?">
            <div className="radio-grid">
              <RadioBox active label="No" />
              <RadioBox label="Yes" />
            </div>
          </FormGroup>

          <FormGroup label="Additional Notes (Optional)">
            <Input
              icon={<MessageSquareText />}
              value="Enter any additional information about your collateral..."
              muted
            />
            <p className="character-count">0/250 characters</p>
          </FormGroup>

          <div className="info-box collateral-info-box">
            <Info size={26} />
            <div>
              <h3>Why we need this information</h3>
              <p>
                Collateral reduces the risk of lending and may help you qualify
                for higher loan amounts and better interest rates.
              </p>
            </div>
            <div className="safe-art">🔐</div>
          </div>

          <div className="collatrial-actions">
            <button className="save-btn" onClick={() => navigate("/dashboard")}>
              Save & Exit
              <LogOut size={24} />
            </button>

            <button className="next-btn" onClick={goNext}>
              Next: Guarantor Information
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

function Input({ icon, value, dropdown, muted }) {
  return (
    <div className="input-box">
      <div className="input-icon">{icon}</div>
      <div className={`input-value ${muted ? "muted" : ""}`}>{value}</div>
      {dropdown && <ChevronDown className="dropdown-icon" size={24} />}
    </div>
  );
}

function RadioBox({ active, label, onClick }) {
  return (
    <button className={`radio-box ${active ? "active" : ""}`} onClick={onClick} type="button">
      {active ? <CircleDot size={24} /> : <Circle size={24} />}
      <span>{label}</span>
    </button>
  );
}

function UploadInput() {
  return (
    <div className="upload-input">
      <div className="input-icon">
        <FileText />
      </div>

      <div className="input-value">Title Deed</div>

      <button>
        <Upload size={20} />
        Upload
      </button>
    </div>
  );
}
