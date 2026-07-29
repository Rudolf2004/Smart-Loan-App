const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function translateInterface(texts, language) {
  const response = await fetch(`${API_URL}/api/translations/interface`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts, language }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Translation unavailable.");
  return Object.fromEntries(payload.source.map((text, index) => [text, payload.translations[index]]));
}
