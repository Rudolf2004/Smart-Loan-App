import { Landmark } from "lucide-react";

export default function Logo({ light = false }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl ${
        light ? "bg-white text-[#0F4C81]" : "bg-[#0F4C81] text-white"
      }`}>
        <Landmark size={42} strokeWidth={2.2} />
      </div>

      <h1 className={`mt-5 text-3xl font-extrabold tracking-wide ${
        light ? "text-white" : "text-[#0F172A]"
      }`}>
        SMART LOAN
      </h1>

      <p className={`mt-1 text-xs font-semibold tracking-[0.24em] ${
        light ? "text-blue-100" : "text-slate-500"
      }`}>
        RISK ASSESSMENT SYSTEM
      </p>
    </div>
  );
}