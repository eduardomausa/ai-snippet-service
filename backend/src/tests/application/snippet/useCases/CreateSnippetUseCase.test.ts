import { CreateSnippetUseCase } from "@application/snippet/useCases/CreateSnippetUseCase";
import { CreateSnippetDTO } from "@domain/snippet/dto/CreateSnippetDTO";

describe("CreateSnippetUseCase", () => {
  let createSnippetUseCase: CreateSnippetUseCase;
  let snippetRepositoryMock: any;
  let summarizerMock: any;

  beforeEach(() => {
    snippetRepositoryMock = {
      create: jest.fn(),
    };

    summarizerMock = {
      summarize: jest.fn(),
    };

    createSnippetUseCase = new CreateSnippetUseCase(
      snippetRepositoryMock,
      summarizerMock
    );
  });

  it("should summarize the text and create a snippet with the summary", async () => {
    const dto: CreateSnippetDTO = { text: "some long text" };
    const fakeSummary = "summary";
    const fakeCreatedSnippet = {
      id: "1",
      text: dto.text,
      summary: fakeSummary,
    };

    summarizerMock.summarize.mockResolvedValue(fakeSummary);
    snippetRepositoryMock.create.mockResolvedValue(fakeCreatedSnippet);

    const result = await createSnippetUseCase.execute(dto);

    expect(summarizerMock.summarize).toHaveBeenCalledWith(dto.text);
    expect(snippetRepositoryMock.create).toHaveBeenCalledWith({
      text: dto.text,
      summary: fakeSummary,
    });
    expect(result).toEqual(fakeCreatedSnippet);
  });
});
