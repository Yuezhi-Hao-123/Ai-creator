import type { AppConfig } from "./types";

/**
 * Reads environment variables and returns a typed AppConfig.
 * Only call this on the server side — it reads process.env directly.
 */
export function getConfig(): AppConfig {
  const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
  const deepseekModel = process.env.DEEPSEEK_MODEL || "deepseek-chat";
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!deepseekApiKey) {
    throw new Error(
      "Missing DEEPSEEK_API_KEY. Add it to your .env.local file."
    );
  }
  if (!supabaseUrl) {
    throw new Error("Missing SUPABASE_URL. Add it to your .env.local file.");
  }
  if (!supabaseAnonKey) {
    throw new Error(
      "Missing SUPABASE_ANON_KEY. Add it to your .env.local file."
    );
  }

  return { deepseekApiKey, deepseekModel, supabaseUrl, supabaseAnonKey };
}
