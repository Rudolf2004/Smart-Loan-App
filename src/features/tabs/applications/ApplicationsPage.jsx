import MobileShell from "../../../components/layout/MobileShell";
import BottomNav from "../../../components/layout/BottomNav";
import "./applications.css";

export default function ApplicationsPage() {
  const summary = [
    { label: "Total Applications", value: 4, color: "#eef5ff" },
    { label: "Approved", value: 2, color: "#ecfff3" },
    { label: "Under Review", value: 1, color: "#fff8e8" },
    { label: "Rejected", value: 1, color: "#fff0f0" },
  ];

  const items = [
    { title: "Business Loan", id: "APP-2024-0004", date: "May 20, 2024", amount: "€50,000", status: "Under Review" },
    { title: "Personal Loan", id: "APP-2024-0003", date: "May 10, 2024", amount: "€25,000", status: "Approved" },
    { title: "Education Loan", id: "APP-2024-0002", date: "Apr 28, 2024", amount: "€15,000", status: "Approved" },
    { title: "Home Improvement Loan", id: "APP-2024-0001", date: "Apr 12, 2024", amount: "€8,000", status: "Rejected" },
  ];

  return (
    <MobileShell>
      <main className="applications-page px-5 py-6 pb-28">
        <h1>Applications</h1>
        <p className="muted">Track the status of all your loan applications.</p>

        <section className="summary-row">
          {summary.map((s) => (
            <div className="summary-card" key={s.label} style={{background:s.color}}>
              <div className="summary-value">{s.value}</div>
              <div className="summary-label">{s.label}</div>
            </div>
          ))}
        </section>

        <div className="filters">
          <button className="filter active">All</button>
          <button className="filter">Under Review</button>
          <button className="filter">Approved</button>
          <button className="filter">Rejected</button>
        </div>

        <section className="applications-list">
          {items.map((it) => (
            <article className="app-item" key={it.id}>
              <div className="app-left">
                <div className="app-icon">📄</div>
                <div>
                  <div className="app-title">{it.title}</div>
                  <div className="app-sub">Application ID: {it.id} • Applied on {it.date}</div>
                </div>
              </div>

              <div className="app-right">
                <div className={`status ${it.status === 'Approved' ? 'green' : it.status==='Under Review' ? 'yellow':'red'}`}>{it.status}</div>
                <div className="app-amount">{it.amount}</div>
              </div>
            </article>
          ))}
        </section>

        <div className="refresh-row">
          <div className="note">Don't see your application? If you've recently applied, it may take some time to update your application status.</div>
          <button className="btn-refresh">Refresh</button>
        </div>

        <BottomNav />
      </main>
    </MobileShell>
  );
}
