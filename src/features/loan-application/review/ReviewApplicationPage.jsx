import {
  ArrowLeft,
  ShieldCheck,
  User,
  BriefcaseBusiness,
  PieChart,
  FileText,
  Home,
  Pencil,
  Check,
  Save,
  Send,
  Lock,
} from "lucide-react";
import "./reviewApplication.css";
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

export default function ReviewApplicationPage() {
  const navigate = useNavigate();
  const { application, error, loading, setError } = useLoanApplication();

  const handleSubmit = () => {
    setError("");
    navigate("/loan/processing");
  };

  const formatChoice = (value) =>
    value ? value.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "-";

  return (
    <main className="review-page">
      <div className="review-container">
        <header className="review-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={30} />
          </button>

          <h1>Loan Application</h1>

          <div className="secure-text">
            <ShieldCheck size={20} />
            <span>Secure & Safe</span>
          </div>
        </header>

        <section className="review-steps">
          <div className="steps-line" />

          {steps.map((step, index) => (
            <div className="step-item" key={step}>
              <div className="step-circle active">{index + 1}</div>
              <p className="active">{step}</p>
            </div>
          ))}
        </section>

        <section className="review-title-section">
          <div>
            <p className="step-count">Step 7 of 7</p>
            <h2>Review Your Application</h2>
            <p className="title-desc">
              Please review all the information below before submitting your
              loan application.
            </p>
          </div>

          <div className="review-art">🔍</div>
        </section>

        <section className="review-grid">
          <ReviewCard
            icon={<User />}
            title="Personal Information"
            onEdit={() => navigate("/loan/personal-info")}
            lines={[
              `Age: ${application.age || "-"}`,
              `Annual Income: ${application.income || "-"}`,
              `Credit Score: ${application.credit_score || "-"}`,
            ]}
          />

          <ReviewCard
            icon={<BriefcaseBusiness />}
            title="Employment"
            onEdit={() => navigate("/loan/employment-info")}
            lines={[
              `Employment Status: ${formatChoice(application.employment_status)}`,
              `Years Employed: ${application.years_employed || "-"}`,
            ]}
          />

          <ReviewCard
            icon={<PieChart />}
            title="Financial"
            onEdit={() => navigate("/loan/financial-info")}
            lines={[
              `Requested Loan Amount: ${application.loan_amount || "-"}`,
              `Loan Purpose: ${formatChoice(application.loan_purpose)}`,
              `Existing Debt: ${application.existing_debt || "-"}`,
            ]}
          />

          <ReviewCard
            icon={<FileText />}
            title="Loan Details"
            onEdit={() => navigate("/loan/details")}
            lines={[
              `Loan Type: ${formatChoice(application.loan_type)}`,
              `Repayment Period: ${application.repayment_period || "-"} months`,
              `Disbursement Date: ${application.disbursement_date || "-"}`,
            ]}
          />

          <ReviewCard
            icon={<Home />}
            title="Collateral"
            onEdit={() => navigate("/loan/collateral-info")}
            lines={[
              `Collateral: ${formatChoice(application.collateral)}`,
              `Collateral Value: ${application.collateral_value || "-"}`,
              `Ownership: ${formatChoice(application.collateral_ownership)}`,
              `Document: ${application.collateral_document || "-"}`,
            ]}
          />

          <ReviewCard
            icon={<Home />}
            title="Guarantor"
            onEdit={() => navigate("/loan/guarantor-info")}
            lines={[
              `Has Guarantor: ${formatChoice(application.has_guarantor)}`,
              `Guarantor Count: ${application.guarantor_count || "0"}`,
              `Guarantor 1 Income: ${application.guarantor1_income || "-"}`,
              `Guarantor 1 Valid ID: ${formatChoice(application.guarantor1_valid_id)}`,
            ]}
          />
        </section>

        {error ? <p className="security-note" style={{ color: "#c93a3a", marginBottom: 12 }}>{error}</p> : null}

        <section className="declaration-card">
          <div className="declaration-icon">
            <ShieldCheck size={34} />
          </div>

          <div>
            <h3>Declaration</h3>
            <p>
              I hereby declare that the information provided above is true,
              complete and correct to the best of my knowledge. I understand
              that any false information may result in rejection of my
              application or legal action.
            </p>
          </div>

          <div className="agree-box">
            <span>
              <Check size={24} />
            </span>
            <strong>I Agree</strong>
          </div>
        </section>

        <div className="review-actions">
          <button className="save-btn" onClick={() => navigate("/dashboard")}>
            <Save size={24} />
            Save & Exit
          </button>

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            <Send size={24} />
            {loading ? "Evaluating..." : "Evaluate Application"}
          </button>
        </div>

        <p className="security-note">
          <Lock size={16} />
          Your information is encrypted and secure
        </p>
      </div>
    </main>
  );
}

function ReviewCard({ icon, title, lines, onEdit }) {
  return (
    <div className="review-card">
      <div className="review-card-icon">{icon}</div>

      <div>
        <h3>{title}</h3>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <button className="edit-btn" onClick={onEdit}>
        <Pencil size={18} />
        Edit
      </button>
    </div>
  );
}
