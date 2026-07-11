import {
  ArrowLeft,
  ShieldCheck,
  Plus,
  Trash2,
  Info,
  LogOut,
  ArrowRight,
  Circle,
  CircleDot,
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
  const hasGuarantor = application.has_guarantor === "yes";
  const guarantorCount = Number(application.guarantor_count || 0);

  const addSecondGuarantor = () => {
    updateField("has_guarantor", "yes");
    updateField("guarantor_count", "2");
    if (!application.guarantor2_employment || application.guarantor2_employment === "not_applicable") {
      updateField("guarantor2_employment", "employed");
    }
    updateField("guarantor2_valid_id", application.guarantor2_valid_id === "yes" ? "yes" : "no");
  };

  const removeSecondGuarantor = () => {
    updateField("guarantor_count", "1");
  };

  const goNext = () => {
    if (hasGuarantor && (!application.guarantor1_income || application.guarantor1_employment === "not_applicable")) {
      return;
    }

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
              Add guarantor details only when the application has repayment support.
            </p>
          </div>

          <div className="guarantor-art">ID</div>
        </section>

        <section className="guarantor-form-card">
          <FormGroup label="Does the applicant have a guarantor?">
            <div className="radio-grid">
              <RadioBox
                active={hasGuarantor}
                label="Yes"
                onClick={() => updateField("has_guarantor", "yes")}
              />
              <RadioBox
                active={!hasGuarantor}
                label="No"
                onClick={() => updateField("has_guarantor", "no")}
              />
            </div>
          </FormGroup>
        </section>

        {hasGuarantor ? (
          <>
            <GuarantorCard
              title="Guarantor 1"
              income={application.guarantor1_income}
              employment={application.guarantor1_employment}
              validId={application.guarantor1_valid_id}
              onIncomeChange={(value) => updateField("guarantor1_income", value)}
              onEmploymentChange={(value) => updateField("guarantor1_employment", value)}
              onValidIdChange={(value) => updateField("guarantor1_valid_id", value)}
            />

            {guarantorCount === 2 ? (
              <GuarantorCard
                title="Guarantor 2"
                income={application.guarantor2_income}
                employment={application.guarantor2_employment}
                validId={application.guarantor2_valid_id}
                onIncomeChange={(value) => updateField("guarantor2_income", value)}
                onEmploymentChange={(value) => updateField("guarantor2_employment", value)}
                onValidIdChange={(value) => updateField("guarantor2_valid_id", value)}
                onRemove={removeSecondGuarantor}
              />
            ) : (
              <button className="add-guarantor-btn" onClick={addSecondGuarantor} type="button">
                <Plus size={26} />
                Add Second Guarantor
              </button>
            )}
          </>
        ) : null}

        <div className="info-box guarantor-info-box">
          <Info size={26} />
          <div>
            <h3>Important Information</h3>
            <p>
              A guarantor strengthens an application when their income, employment,
              and identification details are valid.
            </p>
          </div>
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

function GuarantorCard({
  title,
  income,
  employment,
  validId,
  onIncomeChange,
  onEmploymentChange,
  onValidIdChange,
  onRemove,
}) {
  return (
    <section className="guarantor-form-card">
      <div className="guarantor-card-header">
        <h3>{title}</h3>
        {onRemove ? (
          <button type="button" onClick={onRemove}>
            <Trash2 size={16} />
            Remove
          </button>
        ) : null}
      </div>

      <div className="form-grid">
        <FormGroup label="Annual Income (GHS)" required>
          <input
            className="input-box"
            type="number"
            min="0"
            placeholder="e.g. 30000"
            value={income}
            onChange={(event) => onIncomeChange(event.target.value)}
          />
        </FormGroup>

        <FormGroup label="Employment Status" required>
          <select
            className="input-box"
            value={employment}
            onChange={(event) => onEmploymentChange(event.target.value)}
          >
            <option value="employed">Employed</option>
            <option value="self_employed">Self-employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="not_applicable">Not Applicable</option>
          </select>
        </FormGroup>
      </div>

      <FormGroup label="Has Valid Identification?" required>
        <select
          className="input-box"
          value={validId}
          onChange={(event) => onValidIdChange(event.target.value)}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </FormGroup>
    </section>
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

function RadioBox({ active, label, onClick }) {
  return (
    <button className={`radio-box ${active ? "active" : ""}`} onClick={onClick} type="button">
      {active ? <CircleDot size={24} /> : <Circle size={24} />}
      <span>{label}</span>
    </button>
  );
}
