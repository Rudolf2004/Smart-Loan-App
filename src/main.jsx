import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { registerServiceWorker } from "./registerServiceWorker.js";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { AccessibilityProvider } from "./contexts/AccessibilityContext.jsx";
import LanguageGate from "./features/language-selection/LanguageGate.jsx";
import AppTranslator from "./i18n/AppTranslator.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AccessibilityProvider><AppTranslator><LanguageGate><AuthProvider><App /></AuthProvider></LanguageGate></AppTranslator></AccessibilityProvider>
    </BrowserRouter>
  </StrictMode>
);

registerServiceWorker();
