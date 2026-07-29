import { useEffect, useRef, useState } from "react";
import { Bot, Mic, Send, Volume2, X } from "lucide-react";
import { askAssistant } from "../../services/assistantApi";
import { speechLocales, useAccessibility } from "../../contexts/accessibilityContext";
import "./loanAssistant.css";
import "./loanAssistantVoice.css";

const welcome = {
  English: "Hello! I can explain the loan process, forms, and documents in plain language. I do not approve or deny loans.",
  Twi: "Maakye! Metumi akyerɛkyerɛ bosea nhyehyɛe ne nkrataa mu wɔ kasa a ɛnyɛ den mu. Menye bosea ntom anaa menpo.",
  French: "Bonjour ! Je peux expliquer simplement la procédure, les formulaires et les documents. Je n’approuve ni ne refuse les prêts.",
  Hausa: "Sannu! Zan iya bayyana tsarin rance, fom da takardu cikin sauƙi. Ba na amincewa ko ƙin rance.",
  Ga: "Baa ni! Miitao ni maaŋma shika akɛɛ gbɛ, fɔm kɛ nkrataa lɛ mli.",
  Ewe: "Woezɔ! Mate ŋu aɖe feɖeɖe ƒe mɔ, agbalẽwo kple nuŋlɔɖiwo me.",
  Spanish: "¡Hola! Puedo explicar el proceso del préstamo, los formularios y los documentos con palabras sencillas. No apruebo ni rechazo préstamos.",
  Portuguese: "Olá! Posso explicar o processo de empréstimo, os formulários e os documentos de forma simples. Não aprovo nem rejeito empréstimos.",
  Arabic: "مرحباً! يمكنني شرح إجراءات القرض والنماذج والمستندات بلغة بسيطة. لا أوافق على القروض ولا أرفضها.",
};

export default function LoanAssistant() {
  const { language } = useAccessibility();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const logRef = useRef(null);
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [messages, busy]);

  const submitContent = async (rawContent) => {
    const content = rawContent.trim();
    if (!content || busy) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next); setInput(""); setError(""); setBusy(true);
    try {
      const answer = await askAssistant(next.slice(-12), language);
      setMessages([...next, { role: "assistant", content: answer }]);
      if (autoSpeak) speak(answer);
    } catch (requestError) { setError(requestError.message); }
    finally { setBusy(false); }
  };

  const submit = (event) => {
    event.preventDefault();
    submitContent(input);
  };

  const listen = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return setError("Speech input is not supported by this browser.");
    const recognition = new Recognition();
    recognition.lang = speechLocales[language];
    recognition.onstart = () => { setListening(true); setError(""); };
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      submitContent(transcript);
    };
    recognition.onerror = () => setError("I could not hear that. You can type your question instead.");
    recognition.start();
  };

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLocales[language];
    window.speechSynthesis.speak(utterance);
  };

  return <>
    <button className="assistant-launcher" type="button" onClick={() => setOpen(true)} aria-label="Open loan guide"><Bot /><span>Loan guide</span></button>
    {open ? <section className="assistant-panel" role="dialog" aria-modal="true" aria-labelledby="assistant-title">
      <header><div><strong id="assistant-title">Smart Loan Guide</strong><small>{language} · Educational help</small></div><button type="button" onClick={() => setOpen(false)} aria-label="Close loan guide"><X /></button></header>
      <div className="assistant-notice">AI can make mistakes. Do not share passwords, PINs, ID numbers, or bank login details.</div>
      <label className="assistant-voice-setting"><input type="checkbox" checked={autoSpeak} onChange={(event) => setAutoSpeak(event.target.checked)} /> Speak replies automatically</label>
      <div className="assistant-log" ref={logRef} role="log" aria-live="polite">
        <div className="assistant-message assistant">{welcome[language]}</div>
        {messages.map((message, index) => <div className={`assistant-message ${message.role}`} key={`${message.role}-${index}`}><span>{message.content}</span>{message.role === "assistant" ? <button type="button" onClick={() => speak(message.content)} aria-label="Read answer aloud"><Volume2 size={16} /></button> : null}</div>)}
        {busy ? <div className="assistant-message assistant">Thinking…</div> : null}
        {error ? <div className="assistant-error" role="alert">{error}</div> : null}
      </div>
      <form className="assistant-form" onSubmit={submit}>
        <label htmlFor="assistant-input" className="sr-only">Ask about your loan application</label>
        <textarea id="assistant-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={2000} placeholder="Ask about forms or documents…" rows="2" />
        <button className={listening ? "listening" : ""} type="button" onClick={listen} aria-label="Speak and send your question"><Mic /></button>
        <button type="submit" disabled={!input.trim() || busy} aria-label="Send question"><Send /></button>
      </form>
    </section> : null}
  </>;
}
