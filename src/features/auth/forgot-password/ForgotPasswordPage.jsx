import {
  ArrowLeft,
  Mail,
  Phone,
  Send,
  Info,
  ShieldCheck,
  Lock,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import MobileShell from "../../../components/layout/MobileShell";
import "./forgotPassword.css";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("email");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const isEmail = method === "email";

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(
      isEmail
        ? "Password reset link sent to your email."
        : "Password reset instructions sent to your phone."
    );
  };

  return (
    <MobileShell>
      <main className="forgot-page">
        <button
          type="button"
          className="forgot-back"
          onClick={() => navigate("/login")}
        >
          <ArrowLeft size={31} />
        </button>

        <section className="forgot-hero">
          <div className="forgot-brand">
            <div className="forgot-logo-circle">
              <div className="forgot-bank-roof" />
              <div className="forgot-bank-body">
                <span />
                <span />
                <span />
              </div>
            </div>

            <h1>SMART LOAN</h1>
            <p>RISK ASSESSMENT SYSTEM</p>
          </div>

          <div className="forgot-art" aria-hidden="true">
            <div className="forgot-phone">
              <User size={31} />
              <div className="forgot-dots">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="forgot-lock">
              <Lock size={45} />
            </div>

            <div className="forgot-envelope">
              <div className="envelope-paper">
                <Lock size={20} />
              </div>
            </div>

            <div className="forgot-leaves">
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>

        <section className="forgot-copy">
          <h2>
            Forgot <span>Password?</span>
          </h2>
          <p>
            No worries! Enter your registered email or phone number and we'll
            send you reset instructions.
          </p>
        </section>

        <form className="forgot-card" onSubmit={handleSubmit}>
          <h3>Enter your email or phone number</h3>
          <p>We'll send you a link to reset your password.</p>

          <div className="forgot-toggle" role="tablist" aria-label="Reset method">
            <button
              type="button"
              className={isEmail ? "active" : ""}
              onClick={() => setMethod("email")}
            >
              <Mail size={21} />
              Email
            </button>

            <button
              type="button"
              className={!isEmail ? "active" : ""}
              onClick={() => setMethod("phone")}
            >
              <Phone size={21} />
              Phone
            </button>
          </div>

          <label className="forgot-field-label">
            {isEmail ? "Email Address" : "Phone Number"}
            <span className="forgot-field">
              <span>
                {isEmail ? <Mail size={23} /> : <Phone size={23} />}
              </span>
              <input
                type={isEmail ? "email" : "tel"}
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                placeholder={
                  isEmail
                    ? "Enter your registered email address"
                    : "Enter your registered phone number"
                }
                required
              />
            </span>
          </label>

          <button type="submit" className="forgot-submit">
            Send Reset Link
            <Send size={25} />
          </button>

          <div className="forgot-info">
            <Info size={24} />
            <p>
              <strong>{message || "Check your inbox"}</strong>
              <span>
                We'll send a password reset link to your {isEmail ? "email" : "phone"}.
                If you don't see it, check your spam folder.
              </span>
            </p>
          </div>
        </form>

        <div className="forgot-or">
          <span />
          <strong>OR</strong>
          <span />
        </div>

        <section className="forgot-security">
          <p>
            <ShieldCheck size={22} />
            <strong>Your security is our priority</strong>
          </p>
          <span>All data is encrypted and protected.</span>
        </section>

        <button
          type="button"
          className="forgot-login"
          onClick={() => navigate("/login")}
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>
      </main>
    </MobileShell>
  );
}
