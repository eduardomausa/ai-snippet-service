import React, { useState } from "react";
import { createSnippet } from "../../api/snippet";
import Button from "../Button/Button";

const Summarizer: React.FC = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSummary(null);

    try {
      const snippet = await createSnippet(text);
      setSummary(snippet.summary);
    } catch (err: any) {
      setError(
        err?.response?.data?.error || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Text Summarizer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          required
          className="w-full p-4 border rounded resize-none mb-4 h-40"
          data-testid="input-text"
        />
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
          data-testid="submit-button"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </Button>
      </form>
      {error && (
        <p
          className="text-red-500 mt-4"
          role="alert"
          data-testid="error-message"
        >
          {error}
        </p>
      )}
      {summary && (
        <section
          className="mt-6 p-4 bg-gray-50 border rounded"
          data-testid="summary"
        >
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p>{summary}</p>
        </section>
      )}
    </div>
  );
};

export default Summarizer;
