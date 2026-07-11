export default function ProgressBar({ value = 0 }) {
  return (
    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
      <div
        className="h-full rounded-full bg-[#0F4C81] transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}