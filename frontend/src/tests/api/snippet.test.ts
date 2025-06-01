import api from "../../api/axios";
import { createSnippet } from "../../api/snippet";

jest.mock("../../api/axios", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

const mockedApi = api as jest.Mocked<typeof api>;

describe("createSnippet API", () => {
  it("should post text and return snippet response", async () => {
    const mockResponse = {
      data: { id: "123", text: "hello", summary: "summary" },
    };
    mockedApi.post.mockResolvedValueOnce(mockResponse);

    const result = await createSnippet("hello");
    expect(result).toEqual(mockResponse.data);
  });

  it("should throw error if API call fails", async () => {
    mockedApi.post.mockRejectedValueOnce(new Error("Network error"));

    await expect(createSnippet("fail text")).rejects.toThrow("Network error");
  });
});
