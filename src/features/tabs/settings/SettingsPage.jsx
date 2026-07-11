import MobileShell from "../../../components/layout/MobileShell";
import BottomNav from "../../../components/layout/BottomNav";
import { Lock, Mail, Smartphone, ShieldCheck, Bell, Globe, Sun, HelpCircle, FileText, Info, LogOut } from "lucide-react";
import "./settings.css";

export default function SettingsPage() {
  const account = [
    { icon: Lock, label: "Change Password" },
    { icon: Mail, label: "Change Email" },
    { icon: Smartphone, label: "Change Phone Number" },
    { icon: ShieldCheck, label: "Two-Factor Authentication", meta: "Enabled" },
  ];

  const prefs = [
    { icon: Bell, label: "Notification Settings" },
    { icon: Globe, label: "Language", meta: "English" },
    { icon: Sun, label: "Theme", meta: "Light" },
  ];

  const support = [
    { icon: HelpCircle, label: "Help Center" },
    { icon: FileText, label: "Terms & Conditions" },
    { icon: Info, label: "About Smart Loan" },
  ];

  return (
    <MobileShell>
      <main className="settings-page px-5 py-6 pb-28">
        <h1>Settings</h1>
        <p className="muted">Manage your account and app preferences.</p>

        <section className="settings-section">
          <h3>Account</h3>
          {account.map((a) => (
            <div className="setting-row" key={a.label}>
              <div className="setting-left"><a.icon size={18} /></div>
              <div className="setting-middle">
                <div className="setting-label">{a.label}</div>
                {a.meta && <div className="setting-meta">{a.meta}</div>}
              </div>
              <div className="chev">›</div>
            </div>
          ))}
        </section>

        <section className="settings-section">
          <h3>Preferences</h3>
          {prefs.map((a) => (
            <div className="setting-row" key={a.label}>
              <div className="setting-left"><a.icon size={18} /></div>
              <div className="setting-middle">
                <div className="setting-label">{a.label}</div>
                {a.meta && <div className="setting-meta">{a.meta}</div>}
              </div>
              <div className="chev">›</div>
            </div>
          ))}
        </section>

        <section className="settings-section">
          <h3>Support</h3>
          {support.map((a) => (
            <div className="setting-row" key={a.label}>
              <div className="setting-left"><a.icon size={18} /></div>
              <div className="setting-middle">
                <div className="setting-label">{a.label}</div>
              </div>
              <div className="chev">›</div>
            </div>
          ))}

          <div className="logout-row">
            <button className="logout-btn"><LogOut size={16} /> Logout</button>
          </div>
        </section>

        <BottomNav />
      </main>
    </MobileShell>
  );
}
