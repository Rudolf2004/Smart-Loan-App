import { ShieldCheck, ChevronRight } from "lucide-react";

export default function FinancialTips() {
  return (
    <section>
      <h2 className="section-title">Financial Tips</h2>

      <div className="tips-card">
        <div className="tips-icon">
          <ShieldCheck size={32} />
        </div>

        <div>
          <h3>Maintain a good credit score</h3>
          <p>
            Pay your bills on time and keep your credit utilization low to
            qualify for higher loans.
          </p>
        </div>

        <ChevronRight className="tips-arrow" />
      </div>
    </section>
  );
}