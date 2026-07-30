import { useCallback, useEffect, useMemo, useState } from "react";
import { FileText, RefreshCw } from "lucide-react";
import MobileShell from "../../../components/layout/MobileShell";
import BottomNav from "../../../components/layout/BottomNav";
import { getMyApplications } from "../../../services/adminApi";
import "./applications.css";

const statusLabels = { under_review: "Under Review", approved: "Approved", rejected: "Rejected", needs_information: "Needs Information" };
const statusColors = { approved: "green", under_review: "yellow", needs_information: "yellow", rejected: "red" };
const currency = new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS", maximumFractionDigits: 0 });

export default function ApplicationsPage() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { setItems((await getMyApplications()).applications); }
    catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const visible = useMemo(() => filter === "all" ? items : items.filter((item) => item.status === filter), [filter, items]);
  const summary = [
    { label: "Total Applications", value: items.length, color: "#eef5ff" },
    { label: "Approved", value: items.filter((item) => item.status === "approved").length, color: "#ecfff3" },
    { label: "Under Review", value: items.filter((item) => item.status === "under_review").length, color: "#fff8e8" },
    { label: "Rejected", value: items.filter((item) => item.status === "rejected").length, color: "#fff0f0" },
  ];

  return <MobileShell><main className="applications-page px-5 py-6 pb-28">
    <h1>Applications</h1><p className="muted">Track the status of all your loan applications.</p>
    {error ? <p className="login-error">{error}</p> : null}
    <section className="summary-row">{summary.map((item) => <div className="summary-card" key={item.label} style={{ background: item.color }}><div className="summary-value">{item.value}</div><div className="summary-label">{item.label}</div></div>)}</section>
    <div className="filters">{[["all", "All"], ["under_review", "Under Review"], ["approved", "Approved"], ["rejected", "Rejected"]].map(([value, label]) => <button key={value} className={`filter ${filter === value ? "active" : ""}`} onClick={() => setFilter(value)}>{label}</button>)}</div>
    <section className="applications-list">{visible.map((item) => <article className="app-item" key={item.id}><div className="app-left"><div className="app-icon"><FileText /></div><div><div className="app-title">{item.payload.loan_purpose.replaceAll("_", " ")} loan</div><div className="app-sub">Application ID: {item.id} • Applied on {new Date(item.createdAt).toLocaleDateString()}</div>{item.reviewNote ? <div className="app-sub">Reviewer note: {item.reviewNote}</div> : null}</div></div><div className="app-right"><div className={`status ${statusColors[item.status]}`}>{statusLabels[item.status]}</div><div className="app-amount">{currency.format(item.payload.loan_amount)}</div></div></article>)}{!loading && !visible.length ? <p className="muted">No applications match this filter.</p> : null}</section>
    <div className="refresh-row"><div className="note">Status changes made by a human reviewer will appear here.</div><button className="btn-refresh" onClick={load} disabled={loading}><RefreshCw size={15} /> {loading ? "Refreshing…" : "Refresh"}</button></div>
    <BottomNav />
  </main></MobileShell>;
}
