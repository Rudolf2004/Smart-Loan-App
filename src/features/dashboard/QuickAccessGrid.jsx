import { FileText, Calculator, PieChart, User } from "lucide-react";

const items = [
  { title: "Loan History", icon: FileText },
  { title: "Loan Calculator", icon: Calculator },
  { title: "My Applications", icon: PieChart },
  { title: "Profile", icon: User },
];

export default function QuickAccessGrid() {
  return (
    <section>
      <h2 className="section-title">Quick Access</h2>

      <div className="quick-grid">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button className="quick-card" key={item.title}>
              <Icon size={32} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}