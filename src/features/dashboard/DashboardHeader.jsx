import { Menu, Bell, User } from "lucide-react";
import { useNavigate } from "react-router";

export default function DashboardHeader() {
  const navigate = useNavigate();
  return (
    <>
      <header className="dashboard-header">
        <button className="icon-btn">
          <Menu size={30} />
        </button>

        <div className="brand">
          <div className="brand-icon">🏦</div>
          <div>
            <h1>SMART LOAN</h1>
            <p>RISK ASSESSMENT SYSTEM</p>
          </div>
        </div>

        <button className="icon-btn notification-btn" onClick={() => navigate('/notifications')}>
          <Bell size={28} />
          <span>3</span>
        </button>
      </header>

      <section className="welcome-section">
        <div>
          <h2>
            Good morning, <br />
            <span>RUDOLF SETOR 👋</span>
          </h2>
          <p>Welcome back! Let's achieve your goals today.</p>
        </div>

        <div className="profile-avatar">
          <User size={42} />
        </div>
      </section>
    </>
  );
}