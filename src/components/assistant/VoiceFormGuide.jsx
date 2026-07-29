import { useRef, useState } from "react";
import { Mic, Square, Volume2 } from "lucide-react";
import { useLocation } from "react-router";
import { speechLocales, useAccessibility } from "../../contexts/accessibilityContext.js";
import { translateText } from "../../i18n/translations.js";
import "./voiceFormGuide.css";

const prompts = {
  English: { ask: "Please say your answer for", done: "This page is complete. Review your answers, then select Next.", retry: "I did not understand. Please say one of these choices:" },
  Twi: { ask: "Yɛsrɛ wo, ka wo mmuaeɛ ma", done: "Kratafa yi awie. Hwɛ wo mmuaeɛ no mu na paw Nea Edi Hɔ.", retry: "Mante aseɛ. Yɛsrɛ wo, paw emu baako:" },
  French: { ask: "Veuillez dire votre réponse pour", done: "Cette page est terminée. Vérifiez vos réponses, puis sélectionnez Suivant.", retry: "Je n’ai pas compris. Dites l’un de ces choix :" },
  Hausa: { ask: "Da fatan ka faɗi amsarka ga", done: "An kammala wannan shafin. Duba amsoshinka sannan ka zaɓi Na Gaba.", retry: "Ban gane ba. Faɗi ɗaya daga cikin zaɓuɓɓukan nan:" },
  Ga: { ask: "Ofainɛ, gblɔ bo hetoo ni", done: "Krataa nɛɛ ewie. Shwɛ bo hetoo ni sane Next.", retry: "Minátee. Gblɔ nɔ ko mli:" },
  Ewe: { ask: "Taflatse gblɔ wò ŋuɖoɖo le", done: "Axa sia wu enu. Dzro wò ŋuɖoɖowo eye nàtia Eyome.", retry: "Nyemese egɔme o. Gblɔ ɖeka le esiawo me:" },
  Spanish: { ask: "Por favor, diga su respuesta para", heard: "He oído", done: "Esta página está completa. Revise sus respuestas y seleccione Siguiente.", retry: "No entendí. Diga una de estas opciones:", unsupported: "Este navegador no admite el reconocimiento de voz.", empty: "No se encontraron campos que puedan completarse por voz." },
  Portuguese: { ask: "Diga a sua resposta para", heard: "Ouvi", done: "Esta página está concluída. Reveja as respostas e selecione Seguinte.", retry: "Não entendi. Diga uma destas opções:", unsupported: "Este navegador não suporta reconhecimento de voz.", empty: "Não foram encontrados campos que possam ser preenchidos por voz." },
  Arabic: { ask: "يرجى نطق إجابتك عن", heard: "سمعت", done: "اكتملت هذه الصفحة. راجع إجاباتك ثم اختر التالي.", retry: "لم أفهم. قل أحد هذه الخيارات:", unsupported: "التعرف على الصوت غير مدعوم في هذا المتصفح.", empty: "لم يتم العثور على حقول يمكن ملؤها بالصوت." },
};

function speak(text, language, onEnd) {
  window.speechSynthesis.cancel();
  const message = new SpeechSynthesisUtterance(text);
  message.lang = speechLocales[language];
  message.onend = () => onEnd?.();
  window.speechSynthesis.speak(message);
}

function fieldLabel(field) {
  const group = field.closest(".form-group, label");
  return group?.querySelector("label, span")?.textContent?.replace("*", "").trim() || field.getAttribute("aria-label") || field.name || "this field";
}

function setNativeValue(field, transcript) {
  if (field instanceof HTMLSelectElement) {
    const spoken = transcript.toLowerCase().replaceAll(" ", "_");
    const option = [...field.options].find((item) => item.value.toLowerCase() === spoken || item.text.toLowerCase().includes(transcript.toLowerCase()));
    if (!option) return { ok: false, choices: [...field.options].filter((item) => item.value).map((item) => item.text).join(", ") };
    Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value").set.call(field, option.value);
  } else {
    const value = field.type === "number" ? transcript.replace(/[^0-9.]/g, "") : transcript;
    if (!value) return { ok: false, choices: "a number" };
    const prototype = field instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, "value").set.call(field, value);
  }
  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
  return { ok: true };
}

export default function VoiceFormGuide() {
  const { pathname } = useLocation();
  const { language } = useAccessibility();
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("");
  const session = useRef({ fields: [], recognition: null });
  if (!pathname.startsWith("/loan/") || /result|processing|review/.test(pathname)) return null;

  const stop = () => { session.current.recognition?.abort(); window.speechSynthesis.cancel(); setActive(false); setStatus(""); };

  const askAt = (index) => {
    const field = session.current.fields[index];
    if (!field) { setStatus(prompts[language].done); speak(prompts[language].done, language); setActive(false); return; }
    const label = translateText(fieldLabel(field), language);
    const question = `${prompts[language].ask} ${label}`;
    setStatus(question); field.scrollIntoView({ behavior: "smooth", block: "center" }); field.focus();
    speak(question, language, () => listenFor(index));
  };

  const listenFor = (index) => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { setStatus(prompts[language].unsupported || "Speech recognition is not supported in this browser."); setActive(false); return; }
    const recognition = new Recognition();
    session.current.recognition = recognition;
    recognition.lang = speechLocales[language];
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      const result = setNativeValue(session.current.fields[index], transcript);
      if (!result.ok) { const retry = `${prompts[language].retry} ${result.choices}`; setStatus(retry); speak(retry, language, () => listenFor(index)); return; }
      const confirmation = `${prompts[language].heard || "I heard"} ${transcript}`;
      setStatus(`✓ ${confirmation}`);
      speak(confirmation, language, () => setTimeout(() => askAt(index + 1), 250));
    };
    recognition.onerror = () => { setStatus(prompts[language].retry); setTimeout(() => askAt(index), 500); };
    recognition.start();
  };

  const start = () => {
    const fields = [...document.querySelectorAll(".form-group input:not([type=file]):not([type=hidden]):not(:disabled), .form-group select:not(:disabled), .form-group textarea:not(:disabled)")];
    if (!fields.length) {
      const message = prompts[language].empty || "No voice-enabled form fields were found on this page.";
      setStatus(message); speak(message, language); return;
    }
    session.current = { fields, recognition: null };
    setActive(true); askAt(0);
  };

  return <aside className="voice-form-guide" aria-live="polite">
    <button type="button" className={active ? "voice-stop" : "voice-start"} onClick={active ? stop : start}>{active ? <Square /> : <Mic />}<span>{active ? "Stop voice form" : "Fill form by voice"}</span></button>
    {status ? <div className="voice-form-status"><Volume2 size={17} />{status}</div> : null}
  </aside>;
}
