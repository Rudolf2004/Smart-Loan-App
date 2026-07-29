import { createContext, useContext } from "react";

export const AccessibilityContext = createContext(null);
export const languages = ["English", "Twi", "French", "Hausa", "Ga", "Ewe", "Spanish", "Portuguese", "Arabic"];
export const speechLocales = {
  English: "en-GH", Twi: "ak-GH", French: "fr-FR", Hausa: "ha-NG", Ga: "gaa-GH", Ewe: "ee-GH",
  Spanish: "es-ES", Portuguese: "pt-PT", Arabic: "ar-SA",
};

export function useAccessibility() {
  const value = useContext(AccessibilityContext);
  if (!value) throw new Error("useAccessibility must be used inside AccessibilityProvider");
  return value;
}
