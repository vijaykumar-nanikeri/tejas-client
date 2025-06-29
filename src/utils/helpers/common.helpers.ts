/**
 * Extracts and parses JSON content from a GPT response string.
 * Handles markdown-wrapped ```json ... ``` format.
 *
 * @param gptResponse - The raw GPT response string
 * @returns Parsed JSON as an object or array, or null if parsing fails
 */
export function extractJsonFromGptResponse<T = unknown>(
  gptResponse: string
): T | null {
  if (!gptResponse || typeof gptResponse !== "string") return null;

  try {
    const cleaned = gptResponse.replace(/```json|```/g, "").trim();
    console.log("vvv-cleaned: ", cleaned);
    return JSON.parse(cleaned) as T;
  } catch (error) {
    console.error("Failed to parse GPT JSON:", error);
    return null;
  }
}
