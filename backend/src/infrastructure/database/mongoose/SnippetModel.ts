import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema({
  text: { type: String, required: true },
  summary: { type: String, required: true },
});

export default mongoose.model("SnippetModel", SnippetSchema);
