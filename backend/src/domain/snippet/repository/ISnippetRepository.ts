import { Snippet } from "../entities/Snippet";

export interface ISnippetRepository {
  create(snippet: Snippet): Promise<Snippet>;
  findById(id: string): Promise<Snippet | null>;
}
