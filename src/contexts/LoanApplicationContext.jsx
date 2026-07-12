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
  loan_type: "term_loan",
  repayment_period: "24",
  disbursement_date: "",
  loan_notes: "",
  existing_debt: "",
  collateral: "yes",
  collateral_value: "",
  collateral_ownership: "sole_ownership",
  collateral_document: "",
  collateral_document_url: "",
  collateral_encumbrance: "no",
  collateral_notes: "",
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
        next.collateral_ownership = value === "no" ? "not_applicable" : current.collateral_ownership;
        next.collateral_document = value === "no" ? "" : current.collateral_document;
        next.collateral_document_url = value === "no" ? "" : current.collateral_document_url;
        next.collateral_encumbrance = value === "no" ? "no" : current.collateral_encumbrance;
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
      if (field === "guarantor_count" && value === "1") {
        next.guarantor2_income = "";
        next.guarantor2_employment = "not_applicable";
        next.guarantor2_valid_id = "no";
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

