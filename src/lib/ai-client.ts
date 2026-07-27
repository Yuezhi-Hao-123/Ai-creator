/**
 * AIClient — DeepSeek API call wrapper.
 * SERVER-SIDE ONLY. Never import this in client components.
 */

interface ChatMessage {
  role: "system" | "user";
  content: string;
}

const DEEPSEEK_BASE = "https://api.deepseek.com/v1/chat/completions";

/**
 * Calls the DeepSeek API and returns the raw response text.
 * Throws descriptive errors for common failure modes.
 */
export async function callDeepSeek(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";

  if (!apiKey || apiKey === "your_deepseek_api_key_here") {
    throw new Error("DEEPSEEK_API_KEY is not configured.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const response = await fetch(DEEPSEEK_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.8,
        max_tokens: 2048,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 401) {
        throw new Error("DeepSeek API key is invalid.");
      }
      if (status === 429) {
        throw new Error("Too many requests. Please wait a moment and try again.");
      }
      if (status >= 500) {
        throw new Error("AI service is temporarily unavailable. Please try again later.");
      }
      throw new Error(`DeepSeek API returned status ${status}.`);
    }

    const data = (await response.json()) as {
      choices: { message: { content: string } }[];
    };

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("AI returned an empty response. Please try again.");
    }

    return content;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("AI request timed out. Please try again.");
    }
    // Re-throw known errors
    if (err instanceof Error) throw err;
    throw new Error("An unexpected error occurred while calling AI.");
  } finally {
    clearTimeout(timeout);
  }
}
