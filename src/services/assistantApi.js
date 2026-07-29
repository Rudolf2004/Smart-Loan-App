import { getAuthToken } from "./authApi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function askAssistant(messages, language) {
  let response;
  try {
    response = await fetch(`${API_URL}/api/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getAuthToken()}` },
      body: JSON.stringify({ messages, language }),
    });
  } catch {
    throw new Error("The assistant cannot reach the server. Please try again later.");
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "The assistant is unavailable.");
  return payload.answer;
}
