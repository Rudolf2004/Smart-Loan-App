import { ShieldCheck, Zap, Percent, User, ArrowRight, CheckCircle } from "lucide-react";
import MobileShell from "../../components/layout/MobileShell";
import "./authWelcome.css";
import { useNavigate } from "react-router";

export default function AuthWelcomePage() {
  const navigate = useNavigate();

  return (
    <MobileShell>
      <main className="auth-page">
        <section className="auth-logo">
          <div className="logo-circle">
            <span className="bank-icon" />
          </div>

          <h1>SMART LOAN</h1>
          <p>RISK ASSESSMENT SYSTEM</p>
        </section>

        <section className="auth-hero">
          <h2>
            Get the financial <span>support</span> you deserve
          </h2>

          <p>Apply for a loan in minutes and get a decision instantly.</p>
        </section>

        <section className="loan-illustration">
          <div className="bank-card">
            <div className="roof" />
            <div className="pillars">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="phone-card">
            <div className="phone-top" />

            <div className="approved-box">
              <CheckCircle size={28} />
              <strong>Loan Approved</strong>
            </div>

            <div className="amount-box">
              <small>Approved Amount</small>
              <h3>GHS 25,000</h3>
            </div>

            <ul>
              <li><CheckCircle size={16} /> Low Interest Rates</li>
              <li><CheckCircle size={16} /> Fast Approval</li>
              <li><CheckCircle size={16} /> Secure & Reliable</li>
            </ul>
          </div>

          <div className="shield">✓</div>
          <div className="coin coin-one">GHS</div>
          <div className="coin coin-two">GHS</div>
        </section>

        <section className="auth-panel">
          <div className="features">
            <Feature icon={<ShieldCheck />} title="Secure" text="& Safe" />
            <Feature icon={<Zap />} title="Instant" text="Decision" />
            <Feature icon={<Percent />} title="Low" text="Interest" />
            <Feature icon={<User />} title="Trusted" text="by Banks" />
          </div>

          <button className="primary-btn" onClick={() => navigate("/login")}>
            Login to Account
            <ArrowRight size={22} />
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/register")}
          >
            <span>Create New Account</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>

          <p className="security-text">
            <ShieldCheck size={16} />
            Your data is encrypted and secure
          </p>
        </section>
      </main>
    </MobileShell>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}
