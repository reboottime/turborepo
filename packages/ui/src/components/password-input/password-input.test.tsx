import { createRef } from "react";
import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PasswordInput } from "./index";

describe("PasswordInput", () => {
  it("renders password input field", () => {
    render(<PasswordInput placeholder="Enter password" />);
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
  });

  it("starts with type=password", () => {
    render(<PasswordInput placeholder="Enter password" />);
    const input = screen.getByPlaceholderText("Enter password");
    expect(input).toHaveAttribute("type", "password");
  });

  // -- Toggle functionality --

  it("toggles password visibility when toggle button is clicked", async () => {
    const user = userEvent.setup();
    render(<PasswordInput placeholder="Enter password" />);
    const input = screen.getByPlaceholderText("Enter password");
    const toggleButton = screen.getByLabelText("Show password");

    expect(input).toHaveAttribute("type", "password");

    await user.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Hide password")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Hide password"));
    expect(input).toHaveAttribute("type", "password");
    expect(screen.getByLabelText("Show password")).toBeInTheDocument();
  });

  // -- className merging --

  it("merges custom className with base classes", () => {
    render(<PasswordInput className="custom-class" placeholder="test" />);
    const input = screen.getByPlaceholderText("test");
    expect(input.className).toContain("custom-class");
    expect(input.className).toContain("pr-[var(--spacing-10)]");
  });

  // -- Ref forwarding --

  it("forwards ref to the input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<PasswordInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe("INPUT");
  });

  // -- HTML attributes --

  it("passes through HTML attributes to input", () => {
    render(
      <PasswordInput
        id="password-field"
        name="password"
        autoComplete="current-password"
        placeholder="Enter password"
      />,
    );
    const input = screen.getByPlaceholderText("Enter password");
    expect(input).toHaveAttribute("id", "password-field");
    expect(input).toHaveAttribute("name", "password");
    expect(input).toHaveAttribute("autocomplete", "current-password");
  });

  // -- Disabled state --

  it("disables input when disabled prop is true", () => {
    render(<PasswordInput disabled placeholder="Enter password" />);
    const input = screen.getByPlaceholderText("Enter password");
    expect(input).toBeDisabled();
  });

  it("disables toggle button when disabled", () => {
    render(<PasswordInput disabled placeholder="Enter password" />);
    const toggleButton = screen.getByLabelText("Show password");
    expect(toggleButton).toBeDisabled();
  });

  it("does not allow toggling visibility when disabled", async () => {
    const user = userEvent.setup();
    render(<PasswordInput disabled placeholder="Enter password" />);
    const input = screen.getByPlaceholderText("Enter password");
    const toggleButton = screen.getByLabelText("Show password");

    expect(input).toHaveAttribute("type", "password");
    expect(toggleButton).toBeDisabled();

    // Attempt to click the disabled button - it should not change the type
    await user.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  // -- Value handling --

  it("allows typing in the input field", async () => {
    const user = userEvent.setup();
    render(<PasswordInput placeholder="Enter password" />);
    const input = screen.getByPlaceholderText("Enter password");

    await user.type(input, "mysecret");
    expect(input).toHaveValue("mysecret");
  });

  // -- Accessibility --

  it("toggle button has proper aria-label", () => {
    render(<PasswordInput placeholder="Enter password" />);
    expect(screen.getByLabelText("Show password")).toBeInTheDocument();
  });

  it("toggle button has aria-pressed attribute", () => {
    render(<PasswordInput placeholder="Enter password" />);
    const toggleButton = screen.getByLabelText("Show password");
    expect(toggleButton).toHaveAttribute("aria-pressed", "false");
  });

  it("updates aria-pressed when toggled", async () => {
    const user = userEvent.setup();
    render(<PasswordInput placeholder="Enter password" />);
    const toggleButton = screen.getByLabelText("Show password");

    expect(toggleButton).toHaveAttribute("aria-pressed", "false");

    await user.click(toggleButton);
    const hiddenToggleButton = screen.getByLabelText("Hide password");
    expect(hiddenToggleButton).toHaveAttribute("aria-pressed", "true");
  });

  it("toggle button has aria-controls pointing to input", () => {
    render(<PasswordInput id="test-password" placeholder="Enter password" />);
    const toggleButton = screen.getByLabelText("Show password");
    expect(toggleButton).toHaveAttribute("aria-controls", "test-password");
  });

  it("generates unique id for input when not provided", () => {
    render(<PasswordInput placeholder="Enter password" />);
    const input = screen.getByPlaceholderText("Enter password");
    const toggleButton = screen.getByLabelText("Show password");

    const inputId = input.getAttribute("id");
    expect(inputId).toBeTruthy();
    expect(toggleButton).toHaveAttribute("aria-controls", inputId);
  });

  it("toggle button is keyboard accessible", async () => {
    const user = userEvent.setup();
    render(<PasswordInput placeholder="Enter password" />);
    const toggleButton = screen.getByLabelText("Show password");

    toggleButton.focus();
    expect(toggleButton).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(screen.getByPlaceholderText("Enter password")).toHaveAttribute(
      "type",
      "text",
    );
  });

  it("icons have aria-hidden attribute", () => {
    const { container } = render(
      <PasswordInput placeholder="Enter password" />,
    );
    const icon = container.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("toggle button does not submit forms", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn((e: { preventDefault: () => void }) => {
      e.preventDefault();
    });

    render(
      <form onSubmit={handleSubmit}>
        <PasswordInput placeholder="Enter password" />
      </form>,
    );

    const toggleButton = screen.getByLabelText("Show password");
    await user.click(toggleButton);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  // -- aria-invalid --

  it("passes aria-invalid to input", () => {
    render(<PasswordInput aria-invalid={true} placeholder="Enter password" />);
    const input = screen.getByPlaceholderText("Enter password");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
