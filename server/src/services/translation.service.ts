const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

export async function translateInterfaceTexts(texts: string[], language: string): Promise<string[]> {
  if (language === "English") return texts;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Interface translation is not configured.");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);
  try {
    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-terra",
        instructions: `Translate each static loan-app interface phrase into ${language}. Preserve numbers, currency codes, punctuation, placeholders, and meaning. Use clear, respectful language suitable for a Ghanaian loan applicant. Return only a valid JSON array of translated strings in the same order. Do not add explanations.`,
        input: JSON.stringify(texts),
        max_output_tokens: 2500,
        store: false,
      }),
      signal: controller.signal,
    });
    const payload = await response.json() as { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
    if (!response.ok) throw new Error("Translation service unavailable.");
    const output = payload.output?.flatMap((item) => item.content || []).find((item) => item.type === "output_text")?.text || "";
    const clean = output.trim().replace(/^```json\s*/i, "").replace(/\s*```$/, "");
    const parsed = JSON.parse(clean);
    if (!Array.isArray(parsed) || parsed.length !== texts.length || parsed.some((item) => typeof item !== "string")) throw new Error("Invalid translation response.");
    return parsed;
  } finally { clearTimeout(timeout); }
}
