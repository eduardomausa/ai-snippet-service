import api from "./axios";

export interface SnippetResponse {
  id: string;
  text: string;
  summary: string;
}

export const createSnippet = async (text: string) => {
  const res = await api.post("/api/snippet", { text });
  return res.data;
};
