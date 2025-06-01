import { Snippet } from "@domain/snippet/entities/Snippet";
import { SnippetMapper } from "@domain/snippet/mappers/SnippetMapper";
import { ISnippetRepository } from "@domain/snippet/repository/ISnippetRepository";
import SnippetModel from "@infrastructure/database/mongoose/SnippetModel";

export class SnippetRepository implements ISnippetRepository {
  async create(snippet: Snippet): Promise<Snippet> {
    const data = SnippetMapper.toPersistence(snippet);
    const created = await SnippetModel.create(data);
    return SnippetMapper.toDomain(created);
  }

  async findById(id: string): Promise<Snippet | null> {
    const found = await SnippetModel.findById(id);
    return found ? SnippetMapper.toDomain(found) : null;
  }
}
