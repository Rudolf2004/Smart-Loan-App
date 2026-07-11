import { useContext } from "react";
import { LoanApplicationContext } from "./loanApplicationContext";

export function useLoanApplication() {
  const context = useContext(LoanApplicationContext);

  if (!context) {
    throw new Error("useLoanApplication must be used within a LoanApplicationProvider");
  }

  return context;
}
