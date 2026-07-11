export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-[24px] shadow-sm border border-slate-100 ${className}`}>
      {children}
    </div>
  );
}