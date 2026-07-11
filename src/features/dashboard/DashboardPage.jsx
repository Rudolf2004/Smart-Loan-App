import DashboardHeader from "./DashboardHeader";
import CreditScoreCard from "./CreditScoreCard";
import ApplyLoanCard from "./ApplyLoanCard";
import QuickAccessGrid from "./QuickAccessGrid";
import RecentActivity from "./RecentActivity";
import FinancialTips from "./FinancialTips";
import BottomNavigation from "./BottomNavigation";
import "./dashboard.css";

export default function DashboardPage() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <DashboardHeader />

        <CreditScoreCard />

        <ApplyLoanCard />

        <QuickAccessGrid />

        <RecentActivity />

        <FinancialTips />
      </div>

      <BottomNavigation />
    </main>
  );
}