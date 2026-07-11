import { useState } from "react";
import { useNavigate } from "react-router";
import MobileShell from "../../../components/layout/MobileShell";
import BottomNav from "../../../components/layout/BottomNav";
import { useTheme } from "../../../contexts/useTheme";
import {
  Bell,
  ChevronRight,
  Eye,
  EyeOff,
  FileText,
  Globe,
  HelpCircle,
  Info,
  Lock,
  LogOut,
  Mail,
  Moon,
  ShieldCheck,
  Smartphone,
  Sun,
  X,
} from "lucide-react";
import "./settings.css";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { theme, isDark, toggleTheme } = useTheme();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [message, setMessage] = useState("");

  const submitPassword = (event) => {
    event.preventDefault();
    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      setMessage("Please complete all password fields.");
      return;
    }
    if (passwordForm.next.length < 8) {
      setMessage("New password must be at least 8 characters.");
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    setPasswordForm({ current: "", next: "", confirm: "" });
    setPasswordOpen(false);
    setMessage("Password updated successfully.");
  };

  const logout = () => {
    setLogoutOpen(false);
    navigate("/welcome");
  };

  return (
    <MobileShell>
      <main className="settings-page px-5 py-6 pb-28">
        <h1>Settings</h1>
        <p className="muted">Manage your account and app preferences.</p>

        {message ? <div className="settings-message">{message}</div> : null}

        <section className="settings-section">
          <h3>Account</h3>
          <SettingButton icon={Lock} label="Change Password" onClick={() => setPasswordOpen(true)} />
          <SettingButton icon={Mail} label="Change Email" meta="rudolf@example.com" />
          <SettingButton icon={Smartphone} label="Change Phone Number" meta="+233 000 000 000" />
          <div className="setting-row">
            <div className="setting-left"><ShieldCheck size={18} /></div>
            <div className="setting-middle">
              <div className="setting-label">Two-Factor Authentication</div>
              <div className="setting-meta">{twoFactorEnabled ? "Enabled" : "Disabled"}</div>
            </div>
            <button
              className={`settings-toggle ${twoFactorEnabled ? "active" : ""}`}
              type="button"
              onClick={() => setTwoFactorEnabled((current) => !current)}
              aria-pressed={twoFactorEnabled}
            >
              <span />
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h3>Preferences</h3>
          <SettingButton icon={Bell} label="Notification Settings" meta="Push alerts on" />
          <SettingButton icon={Globe} label="Language" meta="English" />
          <div className="setting-row">
            <div className="setting-left">{isDark ? <Moon size={18} /> : <Sun size={18} />}</div>
            <div className="setting-middle">
              <div className="setting-label">Theme</div>
              <div className="setting-meta">{isDark ? "Dark" : "Light"}</div>
            </div>
            <button
              className={`settings-toggle ${isDark ? "active" : ""}`}
              type="button"
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <span />
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h3>Support</h3>
          <SettingButton icon={HelpCircle} label="Help Center" />
          <SettingButton icon={FileText} label="Terms & Conditions" />
          <SettingButton icon={Info} label="About Smart Loan" />

          <div className="logout-row">
            <button className="logout-btn" onClick={() => setLogoutOpen(true)}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </section>

        {passwordOpen ? (
          <div className="settings-modal-backdrop" role="presentation">
            <section className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="password-title">
              <div className="settings-modal-head">
                <div>
                  <h2 id="password-title">Change Password</h2>
                  <p>Update the password used to access your account.</p>
                </div>
                <button className="modal-close" type="button" onClick={() => setPasswordOpen(false)} aria-label="Close">
                  <X size={18} />
                </button>
              </div>

              <form className="password-settings-form" onSubmit={submitPassword}>
                <PasswordField
                  label="Current Password"
                  value={passwordForm.current}
                  visible={showPasswords}
                  onChange={(value) => setPasswordForm((current) => ({ ...current, current: value }))}
                />
                <PasswordField
                  label="New Password"
                  value={passwordForm.next}
                  visible={showPasswords}
                  onChange={(value) => setPasswordForm((current) => ({ ...current, next: value }))}
                />
                <PasswordField
                  label="Confirm New Password"
                  value={passwordForm.confirm}
                  visible={showPasswords}
                  onChange={(value) => setPasswordForm((current) => ({ ...current, confirm: value }))}
                />

                <button className="show-passwords-btn" type="button" onClick={() => setShowPasswords((current) => !current)}>
                  {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showPasswords ? "Hide passwords" : "Show passwords"}
                </button>

                <button className="save-password-btn" type="submit">Save Password</button>
              </form>
            </section>
          </div>
        ) : null}

        {logoutOpen ? (
          <div className="settings-modal-backdrop" role="presentation">
            <section className="settings-modal compact" role="dialog" aria-modal="true" aria-labelledby="logout-title">
              <h2 id="logout-title">Logout?</h2>
              <p>You will return to the welcome screen.</p>
              <div className="logout-actions">
                <button className="cancel-btn" type="button" onClick={() => setLogoutOpen(false)}>Cancel</button>
                <button className="confirm-logout-btn" type="button" onClick={logout}>Logout</button>
              </div>
            </section>
          </div>
        ) : null}

        <BottomNav />
      </main>
    </MobileShell>
  );
}

function SettingButton({ icon: Icon, label, meta, onClick }) {
  return (
    <button className="setting-row setting-action" type="button" onClick={onClick}>
      <div className="setting-left"><Icon size={18} /></div>
      <div className="setting-middle">
        <div className="setting-label">{label}</div>
        {meta ? <div className="setting-meta">{meta}</div> : null}
      </div>
      <ChevronRight className="chev" size={18} />
    </button>
  );
}

function PasswordField({ label, value, visible, onChange }) {
  return (
    <label className="password-settings-field">
      <span>{label}</span>
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter password"
      />
    </label>
  );
}
