import { Check, Languages } from "lucide-react";
import { languages, useAccessibility } from "../../contexts/accessibilityContext.js";
import "./languageSelection.css";

const languageDetails = {
  English: { native: "English", welcome: "Welcome", action: "Continue" },
  Twi: { native: "Twi (Asante)", welcome: "Akwaaba", action: "Kɔ so" },
  French: { native: "Français", welcome: "Bienvenue", action: "Continuer" },
  Hausa: { native: "Hausa", welcome: "Barka da zuwa", action: "Ci gaba" },
  Ga: { native: "Ga", welcome: "Baa ni", action: "Yaa nɔ" },
  Ewe: { native: "Eʋegbe", welcome: "Woezɔ", action: "Yi edzi" },
  Spanish: { native: "Español", welcome: "Bienvenido", action: "Continuar" },
  Portuguese: { native: "Português", welcome: "Bem-vindo", action: "Continuar" },
  Arabic: { native: "العربية", welcome: "مرحباً", action: "متابعة" },
};

export default function LanguageSelectionPage() {
  const { language, setLanguage, confirmLanguage } = useAccessibility();
  const selected = languageDetails[language];

  return <main className="language-gate">
    <section className="language-card" aria-labelledby="language-title">
      <div className="language-icon" aria-hidden="true"><Languages /></div>
      <p className="language-welcome">{selected.welcome}</p>
      <h1 id="language-title">Choose your language</h1>
      <p className="language-help">Select the language you want to use. You can change it later in Settings.</p>
      <div className="language-options" role="radiogroup" aria-label="Available languages">
        {languages.map((item) => <button key={item} className={`language-option ${language === item ? "selected" : ""}`} type="button" role="radio" aria-checked={language === item} onClick={() => setLanguage(item)}>
          <span><strong>{languageDetails[item].native}</strong><small>{item}</small></span>
          {language === item ? <Check aria-hidden="true" /> : null}
        </button>)}
      </div>
      <button className="language-continue" type="button" onClick={() => confirmLanguage(language)}>{selected.action}</button>
    </section>
  </main>;
}
