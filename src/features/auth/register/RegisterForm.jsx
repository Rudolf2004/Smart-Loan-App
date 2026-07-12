import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  IdCard,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/useAuth";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationalId: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await register({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        nationalId: form.nationalId,
        password: form.password,
      });
      navigate("/dashboard");
    } catch (registerError) {
      setError(registerError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <label className="register-input">
        <div className="input-icon">
          <User size={22} />
        </div>

        <div>
          <strong>Full Name</strong>
          <input
            type="text"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={(event) => updateForm("fullName", event.target.value)}
            required
          />
        </div>
      </label>

      <label className="register-input">
        <div className="input-icon">
          <Mail size={22} />
        </div>

        <div>
          <strong>Email Address</strong>
          <input
            type="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={(event) => updateForm("email", event.target.value)}
            required
          />
        </div>
      </label>

      <label className="register-input">
        <div className="input-icon">
          <Phone size={22} />
        </div>

        <div>
          <strong>Phone Number</strong>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={(event) => updateForm("phone", event.target.value)}
            required
          />
        </div>
      </label>

      <label className="register-input">
        <div className="input-icon">
          <IdCard size={22} />
        </div>

        <div>
          <strong>National ID / Ghana Card Number</strong>
          <input
            type="text"
            placeholder="Enter your national ID number"
            value={form.nationalId}
            onChange={(event) => updateForm("nationalId", event.target.value)}
            required
          />
        </div>
      </label>

      <label className="register-input password-input">
        <div className="input-icon">
          <Lock size={22} />
        </div>

        <div>
          <strong>Password</strong>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={form.password}
            onChange={(event) => updateForm("password", event.target.value)}
            required
          />
        </div>

        <button
          type="button"
          className="eye-btn"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </label>

      <label className="register-input password-input">
        <div className="input-icon">
          <Lock size={22} />
        </div>

        <div>
          <strong>Confirm Password</strong>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={(event) => updateForm("confirmPassword", event.target.value)}
            required
          />
        </div>

        <button
          type="button"
          className="eye-btn"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </label>

      <div className="password-box">
        <h3>
          <ShieldCheck size={18} />
          Password requirements
        </h3>

        <div className="password-list">
          <span>
            <CheckCircle size={16} />
            At least 8 characters
          </span>

          <span>
            <CheckCircle size={16} />
            One uppercase letter
          </span>

          <span>
            <CheckCircle size={16} />
            One lowercase letter
          </span>

          <span>
            <CheckCircle size={16} />
            One number
          </span>

          <span>
            <CheckCircle size={16} />
            One special character
          </span>
        </div>
      </div>

      {error ? <p className="register-error">{error}</p> : null}

      <button type="submit" className="create-account-btn" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}
