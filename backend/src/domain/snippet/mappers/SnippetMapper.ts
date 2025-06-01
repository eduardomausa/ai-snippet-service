import { Document } from "mongoose";
import { Snippet } from "../entities/Snippet";

export class SnippetMapper {
  static toDomain(document: Document): Snippet {
    return new Snippet(
      document.get("text"),
      document.get("summary"),
      document._id.toString()
    );
  }

  static toPersistence(entity: Snippet): Record<string, any> {
    return {
      text: entity.text,
      summary: entity.summary,
    };
  }
}
