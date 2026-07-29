import { useCallback, useEffect, useMemo, useState } from "react";
import { AccessibilityContext, languages } from "./accessibilityContext";

export function AccessibilityProvider({ children }) {
  const savedLanguage = localStorage.getItem("smartLoanLanguage");
  const validSavedLanguage = languages.includes(savedLanguage) ? savedLanguage : null;
  const [language, setLanguage] = useState(() => validSavedLanguage || "English");
  const [languageSelected, setLanguageSelected] = useState(() => Boolean(validSavedLanguage));
  const [largeText, setLargeText] = useState(() => localStorage.getItem("smartLoanLargeText") === "true");
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem("smartLoanHighContrast") === "true");

  useEffect(() => {
    localStorage.setItem("smartLoanLargeText", String(largeText));
    localStorage.setItem("smartLoanHighContrast", String(highContrast));
    document.documentElement.lang = ({ English: "en", Twi: "ak", French: "fr", Hausa: "ha", Ga: "gaa", Ewe: "ee", Spanish: "es", Portuguese: "pt", Arabic: "ar" })[language] || "en";
    document.documentElement.dir = language === "Arabic" ? "rtl" : "ltr";
    document.documentElement.classList.toggle("large-text", largeText);
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [language, largeText, highContrast]);

  const confirmLanguage = useCallback((nextLanguage) => {
    if (!languages.includes(nextLanguage)) return;
    setLanguage(nextLanguage);
    setLanguageSelected(true);
    localStorage.setItem("smartLoanLanguage", nextLanguage);
  }, []);

  const value = useMemo(() => ({ language, setLanguage, languageSelected, confirmLanguage, largeText, setLargeText, highContrast, setHighContrast }), [language, languageSelected, confirmLanguage, largeText, highContrast]);
  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}
