import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the summarizer heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/text summarizer/i);
  expect(headingElement).toBeInTheDocument();
});
