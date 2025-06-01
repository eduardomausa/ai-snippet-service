import { GoogleGenAI } from "@google/genai";
import { ISummarizerService } from "@application/interfaces/ISummarizerService";
import { env } from "@configuration/env";

export class GeminiSummarizerService implements ISummarizerService {
  private client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

  async summarize(text: string): Promise<string> {
    const response = await this.client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Summarize this in ≤ 30 words:\n\n${text}`,
    });

    if (!response.text) {
      throw new Error("Failed to get summary from Gemini.");
    }

    return response.text;
  }
}
