import { GetSnippetUseCase } from "@application/snippet/useCases/GetSnippetUseCase";
import mongoose from "mongoose";

describe("GetSnippetUseCase", () => {
  let getSnippetUseCase: GetSnippetUseCase;
  let snippetRepositoryMock: any;

  beforeEach(() => {
    snippetRepositoryMock = {
      findById: jest.fn(),
    };

    getSnippetUseCase = new GetSnippetUseCase(snippetRepositoryMock);
  });

  it("should throw an error if the ID is not a valid ObjectId", async () => {
    await expect(getSnippetUseCase.execute("invalid-id")).rejects.toThrow(
      "Invalid ID: invalid-id"
    );
  });

  it("should call findById on the repository if ID is valid", async () => {
    const validId = new mongoose.Types.ObjectId().toString();
    const fakeSnippet = { id: validId, text: "text", summary: "summary" };

    snippetRepositoryMock.findById.mockResolvedValue(fakeSnippet);

    const result = await getSnippetUseCase.execute(validId);

    expect(snippetRepositoryMock.findById).toHaveBeenCalledWith(validId);
    expect(result).toEqual(fakeSnippet);
  });
});
