import { Bell } from "lucide-react";

export default function AppHeader({
  title = "Smart Loan",
  subtitle = "",
  showBell = true,
}) {
  return (
    <header className="flex items-center justify-between px-5 pt-5 pb-3">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>

      {showBell && (
        <button className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
          <Bell size={20} />
        </button>
      )}
    </header>
  );
}