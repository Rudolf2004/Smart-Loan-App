import {
  ArrowLeft,
  ShieldCheck,
  Tag,
  Layers,
  CalendarDays,
  MessageSquareText,
  Info,
  LogOut,
  ArrowRight,
  ChevronDown,
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
            <p className="title-desc">
              Tell us how much you need and <br />
              for what purpose.
            </p>
          </div>

          <div className="loan-detail-art">💵</div>
        </section>

        <section className="loan-detail-form-card">
          <FormGroup label="Loan Amount (GHS)" required>
            <input className="input-box" type="number" value={application.loan_amount} onChange={(event) => updateField("loan_amount", event.target.value)} />
          </FormGroup>

          <div className="loan-range">
            <input type="range" min="1000" max="100000" value="25000" readOnly />
            <div className="range-values">
              <span>1,000</span>
              <span>100,000</span>
            </div>
          </div>

          <div className="form-grid">
            <FormGroup label="Loan Purpose" required>
              <Input icon={<Tag />} value="Business Expansion" dropdown />
            </FormGroup>

            <FormGroup label="Loan Type" required>
              <Input icon={<Layers />} value="Term Loan" dropdown />
            </FormGroup>
          </div>

          <div className="form-grid">
            <FormGroup label="Repayment Period" required>
              <Input icon={<CalendarDays />} value="24 Months" dropdown />
            </FormGroup>

            <FormGroup label="Preferred Disbursement Date" required>
              <Input icon={<CalendarDays />} value="June 10, 2024" dropdown />
            </FormGroup>
          </div>

          <FormGroup label="How will this loan help you?" required>
            <Input
              icon={<MessageSquareText />}
              value="The loan will help me expand my business operations and increase inventory."
            />
            <p className="character-count">0/250 characters</p>
          </FormGroup>

          <div className="info-box">
            <Info size={26} />
            <div>
              <h3>Important Information</h3>
              <p>
                The loan details you provide will help us recommend the best
                loan products tailored to your needs.
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

function Input({ icon, value, dropdown }) {
  return (
    <div className="input-box">
      <div className="input-icon">{icon}</div>
      <div className="input-value">{value}</div>
      {dropdown && <ChevronDown className="dropdown-icon" size={24} />}
    </div>
  );
}
