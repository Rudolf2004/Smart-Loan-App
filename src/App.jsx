import { Routes, Route } from "react-router";

import { LoanApplicationProvider } from "./contexts/LoanApplicationContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import SplashPage from "./features/splash";
import AuthWelcomePage from "./features/auth-welcome";
import LoginPage from "./features/auth/login";
import RegisterPage from "./features/auth/register";
import ForgotPasswordPage from "./features/auth/forgot-password";
import DashboardPage from "./features/dashboard";
import LoansPage from "./features/tabs/loans";
import ApplicationsPage from "./features/tabs/applications";
import NotificationsPage from "./features/tabs/notifications";
import SettingsPage from "./features/tabs/settings";
import PersonalInfoPage from "./features/loan-application/personal";
import EmploymentInfoPage from "./features/loan-application/employment";
import FinancialInfoPage from "./features/loan-application/financial";
import LoanDetailsPage from "./features/loan-application/details/LoanDetailsPage";
import CollateralInfoPage from "./features/loan-application/collateral/CollateralInfoPage";
import GuarantorInfoPage from "./features/loan-application/guarantor";
import ReviewApplicationPage from "./features/loan-application/review/ReviewApplicationPage";
import ProcessingPage from "./features/loan-application/processing";
import AssessmentResultPage from "./features/loan-application/result";
import ApprovedResultPage from "./features/loan-application/result/ApprovedResultPage";
import RejectedResultPage from "./features/loan-application/result/RejectedResultPage";

export default function App() {
  return (
    <ThemeProvider>
      <LoanApplicationProvider>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/welcome" element={<AuthWelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/loan/personal-info" element={<PersonalInfoPage />} />
          <Route path="/loan/employment-info" element={<EmploymentInfoPage />} />
          <Route path="/loan/financial-info" element={<FinancialInfoPage />} />
          <Route path="/loan/details" element={<LoanDetailsPage />} />
          <Route path="/loan/collateral-info" element={<CollateralInfoPage />} />
          <Route path="/loan/guarantor-info" element={<GuarantorInfoPage />} />
          <Route path="/loan/review" element={<ReviewApplicationPage />} />
          <Route path="/loan/processing" element={<ProcessingPage />} />
          <Route path="/loan/result" element={<AssessmentResultPage />} />
          <Route path="/loan/result/approved" element={<ApprovedResultPage />} />
          <Route path="/loan/result/rejected" element={<RejectedResultPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </LoanApplicationProvider>
    </ThemeProvider>
  );
}
