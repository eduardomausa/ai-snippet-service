import { ISnippetRepository } from "@domain/snippet/repository/ISnippetRepository";
import mongoose from "mongoose";
import { injectable, inject } from "tsyringe";

@injectable()
export class GetSnippetUseCase {
  constructor(
    @inject("SnippetRepository")
    private snippetRepository: ISnippetRepository
  ) {}

  async execute(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid ID: ${id}`);
    }

    return this.snippetRepository.findById(id);
  }
}
