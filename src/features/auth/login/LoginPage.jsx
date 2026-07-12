import {
  ArrowLeft,
  ArrowRight,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/useAuth";

import MobileShell from "../../../components/layout/MobileShell";
import "./login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();
  const googleButtonRef = useRef(null);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!googleClientId || !googleButtonRef.current) return;

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: async (response) => {
          try {
            setError("");
            await googleLogin(response.credential);
            navigate("/dashboard");
          } catch (googleError) {
            setError(googleError.message);
          }
        },
      });

      googleButtonRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        width: 320,
        text: "continue_with",
      });
    };

    if (window.google?.accounts?.id) {
      initializeGoogle();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;
    document.body.appendChild(script);
  }, [googleClientId, googleLogin, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      await login(identifier, password);
      navigate("/dashboard");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
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

          <button type="submit" className="login-main-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
            <ArrowRight size={30} />
          </button>

          <div className="or-line">
            <span />
            OR
            <span />
          </div>

          {googleClientId ? (
            <div className="google-button-wrap" ref={googleButtonRef} />
          ) : (
            <p className="login-error">
              Add VITE_GOOGLE_CLIENT_ID to enable Google sign-in.
            </p>
          )}
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
