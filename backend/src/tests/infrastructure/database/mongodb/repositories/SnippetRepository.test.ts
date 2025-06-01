import { Snippet } from "@domain/snippet/entities/Snippet";
import { SnippetMapper } from "@domain/snippet/mappers/SnippetMapper";
import { SnippetRepository } from "@infrastructure/database/mongodb/repositories/SnippetRepository";
import SnippetModel from "@infrastructure/database/mongoose/SnippetModel";

jest.mock("@infrastructure/database/mongoose/SnippetModel");
jest.mock("@domain/snippet/mappers/SnippetMapper");

describe("SnippetRepository", () => {
  const repository = new SnippetRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should persist and return a Snippet domain object", async () => {
      const domainSnippet = new Snippet("This is a snippet", "Summary");
      const persistenceData = { text: "This is a snippet", summary: "Summary" };
      const createdDoc = { _id: "mock-id", ...persistenceData };

      (SnippetMapper.toPersistence as jest.Mock).mockReturnValue(
        persistenceData
      );
      (SnippetModel.create as jest.Mock).mockResolvedValue(createdDoc);
      (SnippetMapper.toDomain as jest.Mock).mockReturnValue(domainSnippet);

      const result = await repository.create(domainSnippet);

      expect(SnippetMapper.toPersistence).toHaveBeenCalledWith(domainSnippet);
      expect(SnippetModel.create).toHaveBeenCalledWith(persistenceData);
      expect(SnippetMapper.toDomain).toHaveBeenCalledWith(createdDoc);
      expect(result).toBe(domainSnippet);
    });
  });

  describe("findById", () => {
    it("should return a Snippet domain object if found", async () => {
      const id = "123";
      const foundDoc = { _id: id, text: "Test", summary: "Sum" };
      const domainSnippet = new Snippet("Test", "Sum");

      (SnippetModel.findById as jest.Mock).mockResolvedValue(foundDoc);
      (SnippetMapper.toDomain as jest.Mock).mockReturnValue(domainSnippet);

      const result = await repository.findById(id);

      expect(SnippetModel.findById).toHaveBeenCalledWith(id);
      expect(SnippetMapper.toDomain).toHaveBeenCalledWith(foundDoc);
      expect(result).toBe(domainSnippet);
    });

    it("should return null if snippet is not found", async () => {
      const id = "456";
      (SnippetModel.findById as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(id);

      expect(SnippetModel.findById).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });
  });
});
