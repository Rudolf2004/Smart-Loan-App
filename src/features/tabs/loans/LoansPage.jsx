import MobileShell from "../../../components/layout/MobileShell";
import BottomNav from "../../../components/layout/BottomNav";
import { PlusCircle, DollarSign, Wallet, Circle, CreditCard } from "lucide-react";
import "./loans.css";

export default function LoansPage() {
  return (
    <MobileShell>
      <main className="loans-page px-5 py-6 pb-28">
        <header className="loans-head">
          <h1>Loans</h1>
          <button className="primary-btn">New Loan <PlusCircle size={16} /></button>
        </header>

        <p className="muted">Manage your loans and track their details.</p>

        <section className="stats-row">
          <div className="stat-card">
            <div className="stat-icon"><Circle size={20} /></div>
            <div>
              <div className="stat-value">3</div>
              <div className="stat-label">Total Loans</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><DollarSign size={20} /></div>
            <div>
              <div className="stat-value">€85,000</div>
              <div className="stat-label">Total Borrowed</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><Wallet size={20} /></div>
            <div>
              <div className="stat-value">2</div>
              <div className="stat-label">Active Loans</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><CreditCard size={20} /></div>
            <div>
              <div className="stat-value">€25,000</div>
              <div className="stat-label">Total Repaid</div>
            </div>
          </div>
        </section>

        <section className="loans-list">
          <h2 className="section-title">Active Loans</h2>

          <article className="loan-item">
            <div className="loan-left">
              <div className="loan-icon">🏢</div>
              <div>
                <div className="loan-title">Business Loan</div>
                <div className="loan-id">Loan ID: LN-2024-0001</div>
              </div>
            </div>
            <div className="loan-right">
              <div className="badge active">Active</div>
              <div className="loan-amount">€50,000</div>
            </div>

            <div className="loan-progress">
              <div className="progress-bar"><div style={{width:'60%'}}/></div>
              <div className="progress-meta">Remaining Balance <strong>€20,000</strong></div>
            </div>
          </article>

          <article className="loan-item">
            <div className="loan-left">
              <div className="loan-icon">🏠</div>
              <div>
                <div className="loan-title">Home Improvement Loan</div>
                <div className="loan-id">Loan ID: LN-2024-0002</div>
              </div>
            </div>
            <div className="loan-right">
              <div className="badge active">Active</div>
              <div className="loan-amount">€15,000</div>
            </div>

            <div className="loan-progress">
              <div className="progress-bar"><div style={{width:'40%'}}/></div>
              <div className="progress-meta">Remaining Balance <strong>€9,000</strong></div>
            </div>
          </article>

          <h3 className="section-sub">Past Loans</h3>
          <article className="loan-item small">
            <div className="loan-left">
              <div className="loan-icon">🎓</div>
              <div>
                <div className="loan-title">Education Loan</div>
                <div className="loan-id">Loan ID: LN-2023-0003</div>
              </div>
            </div>
            <div className="loan-right">
              <div className="badge">Fully Repaid</div>
              <div className="loan-amount">€20,000</div>
            </div>
          </article>

          <div className="cta-row">
            <div className="note">Need a new loan? Apply for a new loan and get quick approval.</div>
            <button className="primary-outline">Apply Now</button>
          </div>
        </section>

        <BottomNav />
      </main>
    </MobileShell>
  );
}
