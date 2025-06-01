import { CreateSnippetUseCase } from "@application/snippet/useCases/CreateSnippetUseCase";
import { GetSnippetUseCase } from "@application/snippet/useCases/GetSnippetUseCase";
import { SnippetController } from "@interfaces/http/controllers/SnippetController";
import express, { json } from "express";
import request from "supertest";

jest.mock("@application/snippet/useCases/CreateSnippetUseCase");
jest.mock("@application/snippet/useCases/GetSnippetUseCase");

describe("SnippetController", () => {
  let app: express.Express;
  let createUseCaseMock: jest.Mocked<CreateSnippetUseCase>;
  let getUseCaseMock: jest.Mocked<GetSnippetUseCase>;

  beforeEach(() => {
    app = express();
    app.use(json());

    createUseCaseMock = {
      execute: jest.fn(),
    } as any;

    getUseCaseMock = {
      execute: jest.fn(),
    } as any;

    const controller = new SnippetController(createUseCaseMock, getUseCaseMock);

    app.post("/snippets", (req, res) => controller.create(req, res));
    app.get("/snippets/:id", (req, res) => controller.getById(req, res));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /snippets", () => {
    it("should return 400 if no text is provided", async () => {
      const res = await request(app).post("/snippets").send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Missing text" });
    });

    it("should create a snippet and return 201 with snippet JSON", async () => {
      const snippet = {
        id: "abc123",
        text: "test snippet",
        summary: "test summary",
      };
      createUseCaseMock.execute.mockResolvedValue(snippet);

      const res = await request(app)
        .post("/snippets")
        .send({ text: "test snippet" });

      expect(createUseCaseMock.execute).toHaveBeenCalledWith({
        text: "test snippet",
      });
      expect(res.status).toBe(201);
      expect(res.body).toEqual(snippet);
    });

    it("should return 500 if use case throws an error", async () => {
      createUseCaseMock.execute.mockRejectedValue(new Error("Internal error"));

      const res = await request(app)
        .post("/snippets")
        .send({ text: "some text" });

      expect(res.status).toBe(500);
      expect(res.body).toBe("Internal error");
    });
  });

  describe("GET /snippets/:id", () => {
    it("should return 200 and snippet if found", async () => {
      const snippet = {
        id: "abc123",
        text: "test snippet",
        summary: "test summary",
      };
      getUseCaseMock.execute.mockResolvedValue(snippet);

      const res = await request(app).get("/snippets/abc123");

      expect(getUseCaseMock.execute).toHaveBeenCalledWith("abc123");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(snippet);
    });

    it("should return 404 if snippet not found", async () => {
      getUseCaseMock.execute.mockResolvedValue(null);

      const res = await request(app).get("/snippets/unknown");

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Snippet not found" });
    });

    it("should return 400 if use case throws an error (e.g., invalid ID)", async () => {
      getUseCaseMock.execute.mockRejectedValue(new Error("Invalid ID"));

      const res = await request(app).get("/snippets/badid");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Invalid ID" });
    });
  });
});
