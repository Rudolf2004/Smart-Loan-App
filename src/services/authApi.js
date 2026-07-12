const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const TOKEN_KEY = "smartLoanAuthToken";

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function apiRequest(path, options = {}) {
  const token = getAuthToken();
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    });
  } catch {
    throw new Error(`Cannot reach the server at ${API_URL}. Check VITE_API_URL and that the API is running.`);
  }
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || "Request failed. Please try again.");
  }

  return payload;
}

export async function registerAccount(data) {
  const payload = await apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  setAuthToken(payload.token);
  return payload.user;
}

export async function loginAccount(identifier, password) {
  const payload = await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
  });
  setAuthToken(payload.token);
  return payload.user;
}

export async function loginWithGoogle(credential) {
  const payload = await apiRequest("/api/auth/google", {
    method: "POST",
    body: JSON.stringify({ credential }),
  });
  setAuthToken(payload.token);
  return payload.user;
}

export async function getCurrentUser() {
  if (!getAuthToken()) return null;
  const payload = await apiRequest("/api/auth/me");
  return payload.user;
}

export async function uploadDocument({ purpose, file }) {
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(new Error("Unable to read the selected file."));
    reader.readAsDataURL(file);
  });

  const payload = await apiRequest("/api/uploads", {
    method: "POST",
    body: JSON.stringify({
      purpose,
      fileName: file.name,
      mimeType: file.type,
      data,
    }),
  });

  return payload.document;
}
