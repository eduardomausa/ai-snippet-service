import { Router } from "express";
import { container } from "tsyringe";
import { SnippetController } from "@interfaces/http/controllers/SnippetController";
import { validate } from "@interfaces/http/middleware/validate";
import { createSnippetSchema } from "@interfaces/http/validators/CreateSnippetValidator";

const router = Router();
const controller = container.resolve(SnippetController);

router.post("/", validate(createSnippetSchema), (req, res) =>
  controller.create(req, res)
);
router.get("/:id", (req, res) => controller.getById(req, res));

export default router;
