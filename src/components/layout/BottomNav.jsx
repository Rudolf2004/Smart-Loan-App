import { NavLink } from "react-router";
import { Home, Landmark, FileText, Bell, Settings } from "lucide-react";

const navItems = [
  { label: "Home", path: "/dashboard", icon: Home },
  { label: "Loans", path: "/loans", icon: Landmark },
  { label: "Applications", path: "/applications", icon: FileText },
  { label: "Notifications", path: "/notifications", icon: Bell },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function BottomNav() {
  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 px-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[11px] font-semibold ${
                isActive ? "text-[#0F4C81]" : "text-slate-400"
              }`
            }
          >
            <Icon size={21} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}