import type { ZodSchema } from "zod";

/**
 * ResultParser — parses raw AI text into typed, validated objects.
 * Handles JSON wrapped in markdown code blocks (common LLM behavior).
 */

class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseError";
  }
}

/**
 * Extract and validate JSON from an AI response string.
 * Handles: plain JSON, ```json ... ``` blocks, and ``` ... ``` blocks.
 */
export function parseJSONResponse<T>(
  raw: string,
  schema: ZodSchema<T>
): T {
  // Strategy 1: try direct parse
  try {
    const parsed = JSON.parse(raw.trim());
    return schema.parse(parsed);
  } catch {
    // Not plain JSON, continue
  }

  // Strategy 2: extract from markdown code block (```json ... ``` or ``` ... ```)
  const codeBlockMatch = raw.match(
    /```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/
  );
  if (codeBlockMatch) {
    try {
      const parsed = JSON.parse(codeBlockMatch[1].trim());
      return schema.parse(parsed);
    } catch {
      // Fall through to error
    }
  }

  // Strategy 3: find the first {...} in the text
  const braceMatch = raw.match(/\{[\s\S]*\}/);
  if (braceMatch) {
    try {
      const parsed = JSON.parse(braceMatch[0]);
      return schema.parse(parsed);
    } catch {
      // Fall through to error
    }
  }

  // All strategies failed
  const preview = raw.length > 200 ? raw.slice(0, 200) + "..." : raw;
  console.error("Failed to parse AI response. Raw preview:", preview);
  throw new ParseError(
    "Failed to parse AI response. The model returned an unexpected format. Please try again."
  );
}
