import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  Info,
  LogOut,
  ArrowRight,
  Circle,
  CircleDot,
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

export default function CollateralInfoPage() {
  const navigate = useNavigate();
  const { application, updateField } = useLoanApplication();
  const hasCollateral = application.collateral === "yes";

  const goNext = () => {
    if (hasCollateral && !application.collateral_value) {
      return;
    }

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
              Add collateral details only if the applicant is pledging an asset.
            </p>
          </div>

          <div className="collatrial-art">Home</div>
        </section>

        <section className="collatrial-form-card">
          <FormGroup label="Will you use collateral for this loan?">
            <div className="radio-grid">
              <RadioBox
                active={hasCollateral}
                label="Yes, I have collateral"
                onClick={() => updateField("collateral", "yes")}
              />
              <RadioBox
                active={!hasCollateral}
                label="No collateral"
                onClick={() => updateField("collateral", "no")}
              />
            </div>
          </FormGroup>

          <div className="form-grid">
            <FormGroup label="Estimated Value (GHS)" required={hasCollateral}>
              <input
                className="input-box"
                type="number"
                min="0"
                placeholder={hasCollateral ? "e.g. 40000" : "Not required"}
                value={application.collateral_value}
                onChange={(event) => updateField("collateral_value", event.target.value)}
                disabled={!hasCollateral}
              />
            </FormGroup>

            <FormGroup label="Ownership Status">
              <select
                className="input-box"
                value={application.collateral_ownership}
                onChange={(event) => updateField("collateral_ownership", event.target.value)}
                disabled={!hasCollateral}
              >
                <option value="sole_ownership">Sole Ownership</option>
                <option value="joint_ownership">Joint Ownership</option>
                <option value="family_property">Family Property</option>
                <option value="not_applicable">Not Applicable</option>
              </select>
            </FormGroup>
          </div>

          <FormGroup label="Supporting Document">
            <label className={`upload-input ${!hasCollateral ? "disabled" : ""}`}>
              <div className="input-icon">
                <FileText />
              </div>
              <span className="input-value">
                {application.collateral_document || "Choose a document"}
              </span>
              <span className="upload-button">Browse</span>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                disabled={!hasCollateral}
                onChange={(event) => {
                  const fileName = event.target.files?.[0]?.name || "";
                  updateField("collateral_document", fileName);
                }}
              />
            </label>
          </FormGroup>

          <FormGroup label="Any existing encumbrance on the asset?">
            <div className="radio-grid">
              <RadioBox
                active={application.collateral_encumbrance === "no"}
                label="No"
                onClick={() => updateField("collateral_encumbrance", "no")}
                disabled={!hasCollateral}
              />
              <RadioBox
                active={application.collateral_encumbrance === "yes"}
                label="Yes"
                onClick={() => updateField("collateral_encumbrance", "yes")}
                disabled={!hasCollateral}
              />
            </div>
          </FormGroup>

          <FormGroup label="Additional Notes">
            <textarea
              className="input-box tall"
              maxLength={250}
              placeholder={hasCollateral ? "Add any important collateral details." : "Not required"}
              value={application.collateral_notes}
              onChange={(event) => updateField("collateral_notes", event.target.value)}
              disabled={!hasCollateral}
            />
            <p className="character-count">{application.collateral_notes.length}/250 characters</p>
          </FormGroup>

          <div className="info-box collateral-info-box">
            <Info size={26} />
            <div>
              <h3>Why we need this information</h3>
              <p>
                Collateral may reduce lending risk and can improve the strength of an
                application when the asset details are clear.
              </p>
            </div>
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

function RadioBox({ active, label, onClick, disabled = false }) {
  return (
    <button
      className={`radio-box ${active ? "active" : ""}`}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {active ? <CircleDot size={24} /> : <Circle size={24} />}
      <span>{label}</span>
    </button>
  );
}
