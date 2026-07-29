import { useEffect, useRef } from "react";
import { useAccessibility } from "../contexts/accessibilityContext.js";
import { translateInterface } from "../services/translationApi.js";
import { translateText } from "./translations.js";

const PRIVATE_AREAS = ".assistant-message, .assistant-error, .review-card, .summary-value, .activity-info, .activity-status, .loan-item, .app-item, .profile-avatar, .login-error, .register-error, .security-note, .upload-error, [data-no-translate]";
const STATIC_TAGS = new Set(["H1", "H2", "H3", "H4", "P", "BUTTON", "LABEL", "SPAN", "SMALL", "STRONG", "LI", "OPTION"]);

function loadCache(language) {
  try { return JSON.parse(localStorage.getItem(`smartLoanTranslations:${language}`) || "{}"); }
  catch { return {}; }
}

export default function AppTranslator({ children }) {
  const { language } = useAccessibility();
  const originalsRef = useRef(new WeakMap());

  useEffect(() => {
    let cancelled = false;
    let requestTimer;
    let translating = false;
    const originals = originalsRef.current;
    let cache = loadCache(language);
    const pending = new Set();

    const resolvedText = (source) => {
      const staticResult = translateText(source, language);
      return staticResult !== source ? staticResult : cache[source.trim()] || source;
    };

    const isSafeStaticText = (node, source) => {
      const parent = node.parentElement;
      const text = source.trim();
      if (!parent || !STATIC_TAGS.has(parent.tagName) || parent.closest(PRIVATE_AREAS)) return false;
      if (text.length < 2 || text.length > 180 || !/\p{L}/u.test(text) || /@|https?:|₵|GHS\s*\d/i.test(text)) return false;
      return true;
    };

    const queueTranslation = (source) => {
      const key = source.trim();
      if (language === "English" || cache[key] || translateText(source, language) !== source) return;
      pending.add(key);
      clearTimeout(requestTimer);
      requestTimer = setTimeout(flushTranslations, 180);
    };

    const translateNode = (root) => {
      if (!(root instanceof Element) && !(root instanceof Document)) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName) || parent.closest("[data-no-translate]")) continue;
        if (!originals.has(node)) originals.set(node, node.nodeValue || "");
        const source = originals.get(node);
        const next = resolvedText(source);
        if (node.nodeValue !== next) node.nodeValue = next;
        if (next === source && isSafeStaticText(node, source)) queueTranslation(source);
      }
      root.querySelectorAll?.("input[placeholder], textarea[placeholder]").forEach((element) => {
        if (!element.dataset.originalPlaceholder) element.dataset.originalPlaceholder = element.placeholder;
        const source = element.dataset.originalPlaceholder;
        const next = resolvedText(source);
        if (element.placeholder !== next) element.placeholder = next;
        if (next === source) queueTranslation(source);
      });
      root.querySelectorAll?.("[aria-label], [title]").forEach((element) => {
        for (const attribute of ["aria-label", "title"]) {
          if (!element.hasAttribute(attribute)) continue;
          const dataKey = attribute === "title" ? "originalTitle" : "originalAriaLabel";
          if (!element.dataset[dataKey]) element.dataset[dataKey] = element.getAttribute(attribute);
          const source = element.dataset[dataKey];
          const next = resolvedText(source);
          if (element.getAttribute(attribute) !== next) element.setAttribute(attribute, next);
          if (next === source) queueTranslation(source);
        }
      });
    };

    async function flushTranslations() {
      if (translating || cancelled || language === "English" || !pending.size) return;
      translating = true;
      const batch = [...pending].slice(0, 60);
      batch.forEach((text) => pending.delete(text));
      try {
        const translated = await translateInterface(batch, language);
        if (cancelled) return;
        cache = { ...cache, ...translated };
        localStorage.setItem(`smartLoanTranslations:${language}`, JSON.stringify(cache));
        translateNode(document.body);
      } catch {
        // The built-in dictionary remains available when the configured LLM is offline.
      } finally {
        translating = false;
        if (pending.size) requestTimer = setTimeout(flushTranslations, 250);
      }
    }

    translateNode(document.body);
    const observer = new MutationObserver((changes) => changes.forEach((change) => change.addedNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.parentElement) translateNode(node.parentElement);
      else if (node instanceof Element) translateNode(node);
    })));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { cancelled = true; clearTimeout(requestTimer); observer.disconnect(); };
  }, [language]);

  return children;
}
