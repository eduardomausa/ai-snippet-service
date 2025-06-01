import { GoogleGenAI } from "@google/genai";
import { GeminiSummarizerService } from "@infrastructure/services/GeminiSummarizerService";

jest.mock("@google/genai");

describe("GeminiSummarizerService", () => {
  let summarizerService: GeminiSummarizerService;
  let mockGenerateContent: jest.Mock;

  beforeEach(() => {
    mockGenerateContent = jest.fn();
    (GoogleGenAI as jest.Mock).mockImplementation(() => {
      return {
        models: {
          generateContent: mockGenerateContent,
        },
      };
    });

    summarizerService = new GeminiSummarizerService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the summary text when API call is successful", async () => {
    const inputText = "This is some long text that needs to be summarized.";
    const apiResponse = { text: "This is a short summary." };

    mockGenerateContent.mockResolvedValue(apiResponse);

    const result = await summarizerService.summarize(inputText);

    expect(mockGenerateContent).toHaveBeenCalledWith({
      model: "gemini-2.0-flash",
      contents: `Summarize this in ≤ 30 words:\n\n${inputText}`,
    });
    expect(result).toBe(apiResponse.text);
  });

  it("should throw an error when API returns no text", async () => {
    const inputText = "Some text";
    mockGenerateContent.mockResolvedValue({ text: "" });

    await expect(summarizerService.summarize(inputText)).rejects.toThrow(
      "Failed to get summary from Gemini."
    );
  });
});
