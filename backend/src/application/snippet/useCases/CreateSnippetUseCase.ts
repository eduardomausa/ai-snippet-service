import { CreateSnippetDTO } from "@domain/snippet/dto/CreateSnippetDTO";
import { ISnippetRepository } from "@domain/snippet/repository/ISnippetRepository";
import { ISummarizerService } from "@application/interfaces/ISummarizerService";
import { injectable, inject } from "tsyringe";

@injectable()
export class CreateSnippetUseCase {
  constructor(
    @inject("SnippetRepository")
    private snippetRepository: ISnippetRepository,
    @inject("ISummarizerService")
    private summarizer: ISummarizerService
  ) {}

  async execute({ text }: CreateSnippetDTO) {
    const summary = await this.summarizer.summarize(text);
    return this.snippetRepository.create({ text, summary });
  }
}
