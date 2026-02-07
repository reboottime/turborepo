import { createRef } from "react";
import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./index";

describe("Input", () => {
  it("renders with default props", () => {
    render(<Input aria-label="test input" />);
    expect(
      screen.getByRole("textbox", { name: "test input" }),
    ).toBeInTheDocument();
  });

  it("renders as an input element", () => {
    render(<Input aria-label="test" />);
    expect(screen.getByRole("textbox")).toBeInstanceOf(HTMLInputElement);
  });

  // -- Styling --

  it("applies default styling classes", () => {
    render(<Input aria-label="test" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("form-field-base");
    expect(input.className).toContain("form-field-focus");
  });

  // -- Disabled state --

  it("renders disabled state", () => {
    render(<Input disabled aria-label="test" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("applies disabled styling classes", () => {
    render(<Input disabled aria-label="test" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("form-field-disabled");
  });

  // -- aria-invalid (error state from Form) --

  it("applies aria-invalid error styling classes", () => {
    render(<Input aria-invalid="true" aria-label="test" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("form-field-error");
  });

  // -- User input --

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="test" />);
    const input = screen.getByRole("textbox");

    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Input aria-label="test" onChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "a");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // -- Placeholder --

  it("renders placeholder text", () => {
    render(<Input placeholder="Enter text..." aria-label="test" />);
    expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
  });

  // -- className merging --

  it("merges custom className with default classes", () => {
    render(<Input className="custom-class" aria-label="test" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("custom-class");
    expect(input.className).toContain("form-field-base");
  });

  it("allows custom className to be appended", () => {
    render(<Input className="h-12" aria-label="test" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("h-12");
    expect(input.className).toContain("form-field-base");
  });

  // -- Ref forwarding --

  it("forwards ref to the input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // -- HTML attributes --

  it("passes through HTML attributes", () => {
    render(
      <Input
        type="email"
        name="email"
        aria-label="email"
        autoComplete="email"
      />,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("autocomplete", "email");
  });

  it("renders with password type", () => {
    const { container } = render(
      <Input type="password" aria-label="password" />,
    );
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("type", "password");
  });
});
