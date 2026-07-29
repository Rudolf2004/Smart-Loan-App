import { useAccessibility } from "../../contexts/accessibilityContext.js";
import LanguageSelectionPage from "./LanguageSelectionPage.jsx";

export default function LanguageGate({ children }) {
  const { languageSelected } = useAccessibility();
  return languageSelected ? children : <LanguageSelectionPage />;
}
