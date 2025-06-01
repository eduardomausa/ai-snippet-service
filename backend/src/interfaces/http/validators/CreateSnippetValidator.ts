import { z } from "zod";

export const createSnippetSchema = z.object({
  text: z.string().nonempty("Text is required"),
});
