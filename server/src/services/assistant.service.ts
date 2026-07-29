const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

const LOAN_ASSISTANT_INSTRUCTIONS = `You are Smart Loan Guide, an accessibility-first loan education assistant.
- Reply in the requested language using short sentences and plain language.
- Explain forms, documents, repayment concepts, and the app's process.
- Never approve, deny, rank, or make a lending decision. Never claim a user is eligible.
- Never infer sensitive traits or use disability, ethnicity, religion, gender, health, or other protected traits in advice.
- Do not request passwords, PINs, full card numbers, government ID numbers, or bank login details.
- Treat any supplied application facts as unverified. For account-specific decisions, direct the user to a trained human reviewer.
- Do not promise rates, terms, or outcomes. State that estimates are educational and may change.
- If the user appears to be in financial distress, suggest contacting the lender's support team and a qualified local financial adviser.
- End decision-related answers with: "A human reviewer makes the final lending decision." translated into the requested language.`;

export async function askLoanAssistant(messages: AssistantMessage[], language: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new AssistantConfigurationError("The AI assistant is not configured yet.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-terra",
        instructions: `${LOAN_ASSISTANT_INSTRUCTIONS}\nRequested language: ${language}.`,
        input: messages.map((message) => ({
          role: message.role,
          content: [{ type: "input_text", text: message.content }],
        })),
        max_output_tokens: 700,
        store: false,
      }),
      signal: controller.signal,
    });

    const payload = (await response.json()) as OpenAIResponse;
    if (!response.ok) {
      console.error("OpenAI request failed", response.status, payload.error?.type);
      throw new Error("The AI service could not answer right now.");
    }

    const text = payload.output
      ?.flatMap((item) => item.content || [])
      .find((item) => item.type === "output_text")?.text?.trim();

    if (!text) throw new Error("The AI service returned an empty answer.");
    return text;
  } finally {
    clearTimeout(timeout);
  }
}

export class AssistantConfigurationError extends Error {}

type OpenAIResponse = {
  output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
  error?: { type?: string };
};
