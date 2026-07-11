export default function FormSection({ title, subtitle, children }) {
  return (
    <section className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-5 mb-5">
      <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
      {subtitle && <p className="text-sm text-slate-500 mt-1 mb-5">{subtitle}</p>}

      <div className="space-y-4">{children}</div>
    </section>
  );
}