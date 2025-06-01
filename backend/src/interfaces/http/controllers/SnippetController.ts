import { CreateSnippetUseCase } from "@application/snippet/useCases/CreateSnippetUseCase";
import { GetSnippetUseCase } from "@application/snippet/useCases/GetSnippetUseCase";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class SnippetController {
  constructor(
    @inject("CreateSnippetUseCase")
    private createSnippetUseCase: CreateSnippetUseCase,
    @inject("GetSnippetUseCase")
    private getSnippetUseCase: GetSnippetUseCase
  ) {}

  async create(req: Request, res: Response) {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Missing text" });

    try {
      const snippet = await this.createSnippetUseCase.execute({ text });
      return res.status(201).json(snippet);
    } catch (err: any) {
      return res.status(500).json(err.message);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const snippet = await this.getSnippetUseCase.execute(req.params.id);
      if (!snippet) return res.status(404).json({ error: "Snippet not found" });
      return res.status(200).json(snippet);
    } catch {
      return res.status(400).json({ error: "Invalid ID" });
    }
  }
}
