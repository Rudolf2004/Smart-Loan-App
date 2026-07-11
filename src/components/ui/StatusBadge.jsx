export default function StatusBadge({ status = "neutral", children }) {
  const styles = {
    success: "bg-green-50 text-green-700",
    danger: "bg-red-50 text-red-700",
    warning: "bg-yellow-50 text-yellow-700",
    neutral: "bg-slate-100 text-slate-700",
    info: "bg-blue-50 text-blue-700",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}>
      {children}
    </span>
  );
}