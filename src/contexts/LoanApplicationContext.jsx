import { useMemo, useState } from "react";
import { LoanApplicationContext } from "./loanApplicationContext";

const initialState = {
  age: "",
  income: "",
  credit_score: "",
  employment_status: "employed",
  years_employed: "",
  loan_amount: "",
  loan_purpose: "business",
  existing_debt: "",
  collateral: "yes",
  collateral_value: "",
  has_guarantor: "yes",
  guarantor_count: "1",
  guarantor1_income: "",
  guarantor1_employment: "employed",
  guarantor1_valid_id: "yes",
  guarantor2_income: "",
  guarantor2_employment: "not_applicable",
  guarantor2_valid_id: "no",
};

export function LoanApplicationProvider({ children }) {
  const [application, setApplication] = useState(initialState);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setApplication((current) => {
      const next = { ...current, [field]: value };
      if (field === "collateral") {
        next.collateral_value = value === "no" ? "0" : current.collateral_value;
      }
      if (field === "has_guarantor") {
        if (value === "no") {
          next.guarantor_count = "0";
          next.guarantor1_income = "";
          next.guarantor1_employment = "not_applicable";
          next.guarantor1_valid_id = "no";
          next.guarantor2_income = "";
          next.guarantor2_employment = "not_applicable";
          next.guarantor2_valid_id = "no";
        } else {
          next.guarantor_count = current.guarantor_count || "1";
        }
      }
      return next;
    });
  };

  const resetApplication = () => {
    setApplication(initialState);
    setPrediction(null);
    setError("");
    setLoading(false);
  };

  const value = useMemo(
    () => ({
      application,
      updateField,
      prediction,
      setPrediction,
      loading,
      setLoading,
      error,
      setError,
      resetApplication,
    }),
    [application, prediction, loading, error],
  );

  return <LoanApplicationContext.Provider value={value}>{children}</LoanApplicationContext.Provider>;
}

