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

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="register-form">
      <label className="register-input">
        <div className="input-icon">
          <User size={22} />
        </div>

        <div>
          <strong>Full Name</strong>
          <input type="text" placeholder="Enter your full name" />
        </div>
      </label>

      <label className="register-input">
        <div className="input-icon">
          <Mail size={22} />
        </div>

        <div>
          <strong>Email Address</strong>
          <input type="email" placeholder="Enter your email address" />
        </div>
      </label>

      <label className="register-input">
        <div className="input-icon">
          <Phone size={22} />
        </div>

        <div>
          <strong>Phone Number</strong>
          <input type="tel" placeholder="Enter your phone number" />
        </div>
      </label>

      <label className="register-input">
        <div className="input-icon">
          <IdCard size={22} />
        </div>

        <div>
          <strong>National ID / Ghana Card Number</strong>
          <input type="text" placeholder="Enter your national ID number" />
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

      <button
        type="button"
        className="create-account-btn"
        onClick={() => navigate("/login")}
      >
        Create Account
      </button>
    </form>
  );
}
