import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { BarChart3, FileCheck2, LogOut, RefreshCw, Shield, Users } from "lucide-react";
import { useAuth } from "../../contexts/useAuth";
import { getAdminApplications, getAdminDashboard, getAdminUsers, reviewAdminApplication, updateAdminUser } from "../../services/adminApi";
import "./admin.css";

const labels = { under_review: "Under review", approved: "Approved", rejected: "Rejected", needs_information: "Needs information" };
const money = new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS", maximumFractionDigits: 0 });

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [dashboard, setDashboard] = useState(null);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);

  const load = async () => {
    setBusy(true); setError("");
    try {
      const [dashboardData, applicationData, userData] = await Promise.all([getAdminDashboard(), getAdminApplications(), getAdminUsers()]);
      setDashboard(dashboardData); setApplications(applicationData.applications); setUsers(userData.users);
    } catch (requestError) { setError(requestError.message); }
    finally { setBusy(false); }
  };

  useEffect(() => { void load(); }, []);
  const recent = useMemo(() => applications.slice(0, 6), [applications]);

  const decide = async (status) => {
    if (!selected) return;
    setBusy(true); setError("");
    try {
      const result = await reviewAdminApplication(selected.id, status, note);
      setApplications((items) => items.map((item) => item.id === selected.id ? { ...item, ...result.application } : item));
      setSelected(null); setNote("");
      const updated = await getAdminDashboard(); setDashboard(updated);
    } catch (requestError) { setError(requestError.message); }
    finally { setBusy(false); }
  };

  const changeUser = async (id, changes) => {
    setError("");
    try {
      const result = await updateAdminUser(id, changes);
      setUsers((items) => items.map((item) => item.id === id ? result.user : item));
    } catch (requestError) { setError(requestError.message); }
  };

  return <div className="admin-shell" data-no-translate>
    <aside className="admin-sidebar">
      <div className="admin-brand"><Shield /><span>Smart Loan<strong>Administration</strong></span></div>
      <nav>
        <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}><BarChart3 />Overview</button>
        <button className={tab === "applications" ? "active" : ""} onClick={() => setTab("applications")}><FileCheck2 />Applications</button>
        <button className={tab === "users" ? "active" : ""} onClick={() => setTab("users")}><Users />Users</button>
      </nav>
      <div className="admin-sidebar-actions">
        <button className="admin-exit" onClick={() => navigate("/dashboard")}>Customer app</button>
        <button className="admin-logout" onClick={logout}><LogOut />Sign out</button>
      </div>
    </aside>
    <main className="admin-main">
      <header><div><p>Administrator portal</p><h1>{tab[0].toUpperCase() + tab.slice(1)}</h1></div><div className="admin-profile"><span>{user?.fullName?.[0] || "A"}</span><div><strong>{user?.fullName}</strong><small>{user?.email}</small></div></div></header>
      {error ? <div className="admin-alert">{error}</div> : null}
      <button className="admin-refresh" onClick={load} disabled={busy}><RefreshCw />{busy ? "Loading…" : "Refresh data"}</button>

      {tab === "overview" && dashboard ? <>
        <section className="admin-stats">
          <Stat label="Registered users" value={dashboard.stats.users || 0} />
          <Stat label="Applications" value={dashboard.stats.applications || 0} />
          <Stat label="Under review" value={dashboard.stats.under_review || 0} />
          <Stat label="Approved" value={dashboard.stats.approved || 0} />
          <Stat label="Requested value" value={money.format(dashboard.stats.requestedAmount || 0)} wide />
        </section>
        <AdminTable title="Recent applications" items={recent} onSelect={(item) => { setSelected(item); setNote(item.reviewNote || ""); }} />
      </> : null}

      {tab === "applications" ? <AdminTable title="All loan applications" items={applications} onSelect={(item) => { setSelected(item); setNote(item.reviewNote || ""); }} /> : null}

      {tab === "users" ? <section className="admin-panel"><h2>User management</h2><div className="admin-table-wrap"><table className="admin-users-table"><thead><tr><th>User</th><th>Joined</th><th>Role</th><th>Status</th></tr></thead><tbody>{users.map((item) => <tr key={item.id}><td data-label="User"><strong>{item.fullName}</strong><small>{item.email}<br />{item.phone || ""}</small></td><td data-label="Joined">{new Date(item.createdAt).toLocaleDateString()}</td><td data-label="Role"><select value={item.role || "customer"} onChange={(e) => changeUser(item.id, { role: e.target.value })}><option value="customer">Customer</option><option value="admin">Admin</option></select></td><td data-label="Status"><button className={`status-pill ${item.status || "active"}`} disabled={item.id === user?.id} onClick={() => changeUser(item.id, { status: item.status === "suspended" ? "active" : "suspended" })}>{item.status || "active"}</button></td></tr>)}</tbody></table></div></section> : null}
    </main>

    {selected ? <div className="admin-modal-backdrop"><section className="admin-modal" role="dialog" aria-modal="true"><button className="admin-modal-close" onClick={() => setSelected(null)}>×</button><p className="admin-kicker">{selected.id}</p><h2>{selected.applicant?.fullName || "Applicant"}</h2><div className="admin-details"><Detail label="Amount" value={money.format(selected.payload.loan_amount)} /><Detail label="Purpose" value={selected.payload.loan_purpose} /><Detail label="Income" value={money.format(selected.payload.income)} /><Detail label="Credit score" value={selected.payload.credit_score} /><Detail label="ML assessment" value={`${selected.prediction.decision} (${selected.prediction.confidence}%)`} /><Detail label="Current status" value={labels[selected.status]} /></div><label className="admin-note">Review note<textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength="1000" placeholder="Add the reason for the decision or requested information…" /></label><div className="admin-decisions"><button onClick={() => decide("needs_information")}>Request information</button><button className="reject" onClick={() => decide("rejected")}>Reject</button><button className="approve" onClick={() => decide("approved")}>Approve</button></div><p className="admin-human-note">The ML result is advisory. This recorded action is the human review decision.</p></section></div> : null}
  </div>;
}

function Stat({ label, value, wide }) { return <article className={wide ? "wide" : ""}><span>{label}</span><strong>{value}</strong></article>; }
function Detail({ label, value }) { return <div><span>{label}</span><strong>{String(value).replaceAll("_", " ")}</strong></div>; }
function AdminTable({ title, items, onSelect }) { return <section className="admin-panel"><h2>{title}</h2><div className="admin-table-wrap"><table className="admin-applications-table"><thead><tr><th>Application</th><th>Applicant</th><th>Amount</th><th>ML result</th><th>Status</th><th></th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td data-label="Application"><strong>{item.id}</strong><small>{new Date(item.createdAt).toLocaleString()}</small></td><td data-label="Applicant">{item.applicant?.fullName || item.userId}</td><td data-label="Amount">{money.format(item.payload.loan_amount)}</td><td data-label="ML result">{item.prediction.decision}<small>{item.prediction.confidence}% confidence</small></td><td data-label="Status"><span className={`status-pill ${item.status}`}>{labels[item.status]}</span></td><td className="admin-row-action"><button className="admin-review" onClick={() => onSelect(item)}>Review application</button></td></tr>)}{!items.length ? <tr><td colSpan="6" className="admin-empty">No applications yet.</td></tr> : null}</tbody></table></div></section>; }
