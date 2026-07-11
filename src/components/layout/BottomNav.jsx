import { NavLink } from "react-router";
import { Home, Landmark, FileText, Bell, Settings } from "lucide-react";

const navItems = [
  { label: "Home", path: "/dashboard", icon: Home },
  { label: "Loans", path: "/loans", icon: Landmark },
  { label: "Applications", path: "/applications", icon: FileText },
  { label: "Notifications", path: "/notifications", icon: Bell, badge: 3 },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function BottomNav() {
  return (
    <nav className="bottom-navigation" aria-label="Primary navigation">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <div className="nav-icon-wrap">
              <Icon size={24} />
              {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
            </div>
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
