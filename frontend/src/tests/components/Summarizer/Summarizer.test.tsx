import { render, screen, fireEvent } from "@testing-library/react";
import * as api from "../../../api/snippet";
import Summarizer from "../../../components/Summarizer/Summarizer";

// Correct mock path based on the import above
jest.mock("../../../api/snippet");

describe("Summarizer feature", () => {
  const mockCreateSnippet = api.createSnippet as jest.Mock;

  beforeEach(() => {
    mockCreateSnippet.mockReset();
  });

  it("renders form correctly", () => {
    render(<Summarizer />);
    expect(
      screen.getByPlaceholderText(/paste your text here/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/create snippet/i);
  });

  it("shows summary after successful API call", async () => {
    mockCreateSnippet.mockResolvedValueOnce({
      id: "1",
      text: "input text",
      summary: "short summary",
    });

    render(<Summarizer />);

    fireEvent.change(screen.getByTestId("input-text"), {
      target: { value: "input text" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    const summaryElement = await screen.findByTestId("summary");

    expect(summaryElement).toHaveTextContent("short summary");
  });

  it("shows error message on API failure", async () => {
    mockCreateSnippet.mockRejectedValueOnce(new Error("API failed"));

    render(<Summarizer />);

    fireEvent.change(screen.getByTestId("input-text"), {
      target: { value: "input text" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    const errorElement = await screen.findByTestId("error-message");

    expect(errorElement).toHaveTextContent("API failed");
  });
});
