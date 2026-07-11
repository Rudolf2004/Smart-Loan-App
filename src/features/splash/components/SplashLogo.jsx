import { Landmark, ShieldCheck } from "lucide-react";

export default function SplashLogo() {
  return (
    <div className="flex flex-col items-center mt-56">
      <div className="w-36 h-36 rounded-full border-[10px] border-blue-400/90 flex items-center justify-center shadow-2xl shadow-blue-500/30">
        <Landmark size={86} className="text-white drop-shadow-xl" />
      </div>

      <h1 className="mt-8 text-[42px] font-extrabold tracking-[0.08em] leading-none">
        SMART LOAN
      </h1>

      <p className="mt-4 text-[15px] font-bold tracking-[0.28em] text-sky-300">
        RISK ASSESSMENT SYSTEM
      </p>

      <div className="mt-7 flex items-center gap-6 text-sky-400">
        <span className="w-16 h-[2px] bg-sky-400" />
        <ShieldCheck size={34} />
        <span className="w-16 h-[2px] bg-sky-400" />
      </div>
    </div>
  );
}