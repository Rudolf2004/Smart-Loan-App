import { Home, CircleSlash, Folder, Bell, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const tabs = [
  { title: "Home", icon: Home, path: "/dashboard" },
  { title: "Loans", icon: CircleSlash, path: "/loans" },
  { title: "Applications", icon: Folder, path: "/applications" },
  { title: "Notifications", icon: Bell, path: "/notifications", badge: 3 },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = location.pathname === tab.path;

        return (
          <button
            key={tab.title}
            className={`nav-item ${active ? "active" : ""}`}
            onClick={() => navigate(tab.path)}
          >
            <div className="nav-icon-wrap">
              <Icon size={27} />
              {tab.badge && <span className="nav-badge">{tab.badge}</span>}
            </div>
            <span>{tab.title}</span>
          </button>
        );
      })}
    </nav>
  );
}