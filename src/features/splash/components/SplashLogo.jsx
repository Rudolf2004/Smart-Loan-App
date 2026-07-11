import { Landmark, ShieldCheck } from "lucide-react";

export default function SplashLogo() {
  return (
    <div className="flex flex-col items-center mt-28 min-[390px]:mt-36">
      <div className="w-24 h-24 min-[390px]:w-28 min-[390px]:h-28 rounded-full border-[7px] border-blue-400/90 flex items-center justify-center shadow-2xl shadow-blue-500/30">
        <Landmark size={58} className="text-white drop-shadow-xl" />
      </div>

      <h1 className="mt-5 text-[28px] min-[390px]:text-[34px] font-extrabold tracking-[0.06em] leading-none">
        SMART LOAN
      </h1>

      <p className="mt-3 text-[10px] min-[390px]:text-[12px] font-bold tracking-[0.2em] text-sky-300">
        RISK ASSESSMENT SYSTEM
      </p>

      <div className="mt-5 flex items-center gap-4 text-sky-400">
        <span className="w-12 h-[2px] bg-sky-400" />
        <ShieldCheck size={26} />
        <span className="w-12 h-[2px] bg-sky-400" />
      </div>
    </div>
  );
}
