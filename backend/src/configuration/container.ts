import { ISnippetRepository } from "@domain/snippet/repository/ISnippetRepository";
import { SnippetRepository } from "infrastructure/database/mongodb/repositories/SnippetRepository";
import { GeminiSummarizerService } from "infrastructure/services/GeminiSummarizerService";
import { ISummarizerService } from "@application/interfaces/ISummarizerService";
import { container } from "tsyringe";
import { CreateSnippetUseCase } from "@application/snippet/useCases/CreateSnippetUseCase";
import { GetSnippetUseCase } from "@application/snippet/useCases/GetSnippetUseCase";

container.register<ISnippetRepository>("SnippetRepository", {
  useClass: SnippetRepository,
});

container.register<ISummarizerService>("ISummarizerService", {
  useClass: GeminiSummarizerService,
});

container.register("CreateSnippetUseCase", {
  useClass: CreateSnippetUseCase,
});

container.register("GetSnippetUseCase", {
  useClass: GetSnippetUseCase,
});
