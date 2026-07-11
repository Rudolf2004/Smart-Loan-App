import { Link, useNavigate } from "react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import MobileShell from "../../../components/layout/MobileShell";
import RegisterForm from "./RegisterForm";

import "./register.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <MobileShell>
      <main className="register-page">
        <button
          type="button"
          className="register-back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={26} />
        </button>

        <section className="register-hero">
          <div className="register-logo">
            <div className="register-logo-circle">
              <div className="register-bank-roof" />
              <div className="register-bank-body">
                <span />
                <span />
                <span />
              </div>
            </div>

            <h1>SMART LOAN</h1>
            <p>RISK ASSESSMENT SYSTEM</p>
          </div>

          <div className="register-art">
            <div className="clipboard">
              <div className="clip-top" />

              <div className="paper">
                <div className="paper-fold" />
                <div className="paper-avatar" />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="art-shield">✓</div>
            <div className="art-pen" />
          </div>
        </section>

        <section className="register-panel">
          <div className="register-title">
            <h2>
              Create <span>Account</span>
            </h2>
            <p>Enter your details to start your loan assessment.</p>
          </div>

          <RegisterForm />

          <div className="register-login">
            Already have an account? <Link to="/login">Login</Link>
          </div>

          <p className="register-secure">
            <ShieldCheck size={16} />
            Your data is encrypted and secure
          </p>
        </section>
      </main>
    </MobileShell>
  );
}
