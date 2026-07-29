import { Languages } from "lucide-react";
import { languages, useAccessibility } from "../../contexts/accessibilityContext.js";

export default function DashboardLanguageSelector() {
  const { language, confirmLanguage } = useAccessibility();
  return <section className="dashboard-language" aria-labelledby="dashboard-language-title">
    <div className="dashboard-language-icon"><Languages aria-hidden="true" /></div>
    <label htmlFor="dashboard-language-select">
      <strong id="dashboard-language-title">App language</strong>
      <span>Choose the language used for instructions and application forms.</span>
    </label>
    <select id="dashboard-language-select" value={language} onChange={(event) => confirmLanguage(event.target.value)}>
      {languages.map((item) => <option key={item} value={item}>{item}</option>)}
    </select>
  </section>;
}
