import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../components/Button/Button";

describe("Button component", () => {
  it("renders button text", () => {
    render(<Button />);
    expect(screen.getByText("Create Snippet")).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    render(<Button loading />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
