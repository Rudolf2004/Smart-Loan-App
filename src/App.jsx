import { Navigate, Routes, Route } from "react-router";

import { LoanApplicationProvider } from "./contexts/LoanApplicationContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { useAuth } from "./contexts/useAuth.js";
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
          <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
          <Route path="/loans" element={<RequireAuth><LoansPage /></RequireAuth>} />
          <Route path="/applications" element={<RequireAuth><ApplicationsPage /></RequireAuth>} />
          <Route path="/notifications" element={<RequireAuth><NotificationsPage /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />
          <Route path="/loan/personal-info" element={<RequireAuth><PersonalInfoPage /></RequireAuth>} />
          <Route path="/loan/employment-info" element={<RequireAuth><EmploymentInfoPage /></RequireAuth>} />
          <Route path="/loan/financial-info" element={<RequireAuth><FinancialInfoPage /></RequireAuth>} />
          <Route path="/loan/details" element={<RequireAuth><LoanDetailsPage /></RequireAuth>} />
          <Route path="/loan/collateral-info" element={<RequireAuth><CollateralInfoPage /></RequireAuth>} />
          <Route path="/loan/guarantor-info" element={<RequireAuth><GuarantorInfoPage /></RequireAuth>} />
          <Route path="/loan/review" element={<RequireAuth><ReviewApplicationPage /></RequireAuth>} />
          <Route path="/loan/processing" element={<RequireAuth><ProcessingPage /></RequireAuth>} />
          <Route path="/loan/result" element={<RequireAuth><AssessmentResultPage /></RequireAuth>} />
          <Route path="/loan/result/approved" element={<RequireAuth><ApprovedResultPage /></RequireAuth>} />
          <Route path="/loan/result/rejected" element={<RequireAuth><RejectedResultPage /></RequireAuth>} />
          <Route path="*" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        </Routes>
      </LoanApplicationProvider>
    </ThemeProvider>
  );
}

function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
