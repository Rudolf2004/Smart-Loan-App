import {
  ArrowLeft,
  ArrowRight,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import MobileShell from "../../../components/layout/MobileShell";
import "./login.css";

const TEMP_LOGIN = {
  identifier: "demo@smartloan.com",
  phone: "0240000000",
  password: "SmartLoan123",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const normalizedIdentifier = identifier.trim().toLowerCase();
    const isKnownUser =
      normalizedIdentifier === TEMP_LOGIN.identifier ||
      normalizedIdentifier === TEMP_LOGIN.phone;

    if (isKnownUser && password === TEMP_LOGIN.password) {
      setError("");
      navigate("/dashboard");
      return;
    }

    setError("Use the temporary login details shown below to access the home page.");
  };

  return (
    <MobileShell>
      <main className="login-page">
        <button className="login-back" onClick={() => navigate("/welcome")}>
          <ArrowLeft size={30} />
        </button>

        <section className="login-top">
          <div className="login-brand">
            <div className="login-logo-circle">
              <span className="login-bank-icon" />
            </div>

            <h1>SMART LOAN</h1>
            <p>RISK ASSESSMENT SYSTEM</p>
          </div>

          <div className="login-illustration">
            <div className="login-phone">
              <Lock size={52} />
              <div className="password-dots">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="login-plant">
              <span />
              <span />
              <span />
            </div>

            <div className="login-shield">✓</div>
          </div>
        </section>

        <section className="login-welcome">
          <h2>Welcome back!</h2>
          <p>Login to your account to continue your loan journey</p>
        </section>

        <form className="login-card" onSubmit={handleLogin}>
          <h3>Login to your account</h3>

          <div className="demo-login-box">
            <strong>Temporary login</strong>
            <span>Email: {TEMP_LOGIN.identifier}</span>
            <span>Phone: {TEMP_LOGIN.phone}</span>
            <span>Password: {TEMP_LOGIN.password}</span>
          </div>

          <label className="login-field">
            <span className="field-icon">
              <Mail size={25} />
            </span>

            <span className="field-text">
              <strong>Email or Phone Number</strong>
              <input
                type="text"
                placeholder="Enter your email or phone number"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
              />
            </span>
          </label>

          <label className="login-field">
            <span className="field-icon">
              <Lock size={25} />
            </span>

            <span className="field-text">
              <strong>Password</strong>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </span>

            <button type="button" className="eye-btn">
              <EyeOff size={24} />
            </button>
          </label>

          <div className="login-options">
            <label>
              <span className="check-box">
                <Check size={17} />
              </span>
              Remember me
            </label>

            <button type="button" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </button>
          </div>

          {error ? <p className="login-error">{error}</p> : null}

          <button type="submit" className="login-main-btn">
            Login
            <ArrowRight size={30} />
          </button>

          <div className="or-line">
            <span />
            OR
            <span />
          </div>

          <button type="button" className="google-btn">
            <span className="google-icon">G</span>
            Continue with Google
          </button>
        </form>

        <p className="create-text">
          Don't have an account?{" "}
          <button type="button" onClick={() => navigate("/register")}>
            Create Account
          </button>
        </p>

        <section className="login-security">
          <div>
            <ShieldCheck size={25} />
          </div>

          <p>
            <strong>Your data is encrypted and secure</strong>
            <span>We use bank-level security to protect your information</span>
          </p>
        </section>
      </main>
    </MobileShell>
  );
}
