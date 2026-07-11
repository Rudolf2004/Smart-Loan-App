import { CheckCircle, Clock, ChevronRight } from "lucide-react";

export default function RecentActivity() {
  return (
    <section>
      <div className="section-row">
        <h2>Recent Activity</h2>
        <button>View All</button>
      </div>

      <div className="activity-card">
        <div className="activity-item">
          <div className="activity-icon approved">
            <CheckCircle size={30} />
          </div>

          <div className="activity-info">
            <h3>Loan Application Approved</h3>
            <p>Personal Loan • ₵25,000</p>
          </div>

          <div className="activity-status">
            <strong className="green">Approved</strong>
            <span>May 20, 2024</span>
          </div>

          <ChevronRight className="chevron" />
        </div>

        <div className="activity-divider" />

        <div className="activity-item">
          <div className="activity-icon review">
            <Clock size={30} />
          </div>

          <div className="activity-info">
            <h3>Application Under Review</h3>
            <p>Business Loan • ₵50,000</p>
          </div>

          <div className="activity-status">
            <strong className="blue">Under Review</strong>
            <span>May 18, 2024</span>
          </div>

          <ChevronRight className="chevron" />
        </div>
      </div>
    </section>
  );
}