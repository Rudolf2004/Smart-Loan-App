import MobileShell from "../../../components/layout/MobileShell";
import BottomNav from "../../../components/layout/BottomNav";
import { CheckCircle, Clock, AlertCircle, CreditCard, Info, XCircle } from "lucide-react";
import "./notifications.css";

const items = [
  { icon: CheckCircle, title: "Loan Application Approved", subtitle: "Your Personal Loan application has been approved.", id: "APP-2024-0003", date: "May 20, 2024", time: "10:30 AM" },
  { icon: Clock, title: "Application Under Review", subtitle: "Your Business Loan application is currently under review.", id: "APP-2024-0004", date: "May 18, 2024", time: "02:15 PM" },
  { icon: AlertCircle, title: "Document Requested", subtitle: "Please upload your bank statement for verification.", id: "APP-2024-0002", date: "May 17, 2024", time: "11:45 AM" },
  { icon: CreditCard, title: "Loan Disbursed", subtitle: "Your loan of €25,000 has been disbursed successfully to your account.", id: "LN-2024-0002", date: "May 15, 2024", time: "09:20 AM" },
  { icon: Info, title: "Payment Reminder", subtitle: "Your next payment of €1,250 is due on Jun 20, 2024.", id: "LN-2024-0002", date: "May 14, 2024", time: "08:00 AM" },
  { icon: XCircle, title: "Application Rejected", subtitle: "Your Home Improvement Loan application was not approved.", id: "APP-2024-0001", date: "May 12, 2024", time: "04:30 PM" },
];

export default function NotificationsPage() {
  return (
    <MobileShell>
      <main className="notifications-page px-5 py-6 pb-28">
        <h1>Notifications</h1>
        <p className="muted">Stay updated with your loan activities and important alerts.</p>

        <div className="filter-row">
          <button className="pill active">All</button>
          <button className="pill">Unread</button>
          <button className="pill">Read</button>
        </div>

        <section className="notifications-list">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <article className="notif-item" key={idx}>
                <div className="notif-left">
                  <div className="notif-icon"><Icon size={18} /></div>
                  <div>
                    <div className="notif-title">{it.title}</div>
                    <div className="notif-sub">{it.subtitle}</div>
                    <div className="notif-meta">Application ID: {it.id}</div>
                  </div>
                </div>

                <div className="notif-right">{it.date} • {it.time}</div>
              </article>
            );
          })}
        </section>

        <div className="support-row">
          <div className="note">Need help? Contact our support team if you have any questions.</div>
          <button className="contact-btn">Contact Support</button>
        </div>

        <BottomNav />
      </main>
    </MobileShell>
  );
}
