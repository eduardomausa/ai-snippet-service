import { SnippetMapper } from "@domain/snippet/mappers/SnippetMapper";
import { Snippet } from "@domain/snippet/entities/Snippet";

describe("SnippetMapper", () => {
  describe("toDomain", () => {
    it("should convert a mongoose Document to a Snippet domain entity", () => {
      const mockDoc = {
        _id: "mock-id",
        get: jest.fn((field: string) => {
          if (field === "text") return "Sample text";
          if (field === "summary") return "Sample summary";
          return null;
        }),
      };

      const domainEntity = SnippetMapper.toDomain(mockDoc as any);

      expect(domainEntity).toBeInstanceOf(Snippet);
      expect(domainEntity.text).toBe("Sample text");
      expect(domainEntity.summary).toBe("Sample summary");
      expect(domainEntity.id).toBe("mock-id");
      expect(mockDoc.get).toHaveBeenCalledWith("text");
      expect(mockDoc.get).toHaveBeenCalledWith("summary");
    });
  });

  describe("toPersistence", () => {
    it("should convert a Snippet domain entity to persistence format", () => {
      const snippet = new Snippet(
        "Persisted text",
        "Persisted summary",
        "id-123"
      );

      const persistence = SnippetMapper.toPersistence(snippet);

      expect(persistence).toEqual({
        text: "Persisted text",
        summary: "Persisted summary",
      });
    });
  });
});
