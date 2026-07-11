export default function SelectField({ label, value, onChange, options = [], className = "" }) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="block text-sm font-semibold text-slate-700 mb-2">
          {label}
        </span>
      )}

      <select
        value={value}
        onChange={onChange}
        className="w-full h-13 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none focus:border-[#0F4C81] focus:bg-white"
      >
        <option value="">Select option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}