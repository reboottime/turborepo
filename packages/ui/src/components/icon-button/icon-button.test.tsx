import { createRef } from "react";
import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "./index";

// Simple test icon component
const CloseIcon = () => (
  <svg data-testid="close-icon">
    <path d="M0 0" />
  </svg>
);

describe("IconButton", () => {
  it("renders icon", () => {
    render(<IconButton icon={<CloseIcon />} aria-label="Close" />);
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();
  });

  it("renders as a button element", () => {
    render(<IconButton icon={<CloseIcon />} aria-label="Close" />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInstanceOf(
      HTMLButtonElement,
    );
  });

  it("requires aria-label", () => {
    render(<IconButton icon={<CloseIcon />} aria-label="Close" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Close");
  });

  // -- Variants --

  it("applies ghost variant classes by default", () => {
    render(<IconButton icon={<CloseIcon />} aria-label="Close" />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border-transparent");
    expect(button.className).toContain("hover:bg-surface-sunken");
  });

  it("applies default variant classes", () => {
    render(
      <IconButton icon={<CloseIcon />} aria-label="Close" variant="default" />,
    );
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-primary");
    expect(button.className).toContain("text-text-inverse");
  });

  it("applies outline variant classes", () => {
    render(
      <IconButton icon={<CloseIcon />} aria-label="Close" variant="outline" />,
    );
    const button = screen.getByRole("button");
    expect(button.className).toContain("border");
    expect(button.className).toContain("bg-surface-base");
  });

  it("applies destructive variant classes", () => {
    render(
      <IconButton
        icon={<CloseIcon />}
        aria-label="Delete"
        variant="destructive"
      />,
    );
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-destructive");
  });

  // -- Sizes --

  it("applies default size classes (square)", () => {
    render(<IconButton icon={<CloseIcon />} aria-label="Close" />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-[var(--spacing-10)]");
    expect(button.className).toContain("w-[var(--spacing-10)]");
  });

  it("applies sm size classes (square)", () => {
    render(<IconButton icon={<CloseIcon />} aria-label="Close" size="sm" />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-[var(--spacing-8)]");
    expect(button.className).toContain("w-[var(--spacing-8)]");
  });

  it("applies lg size classes (square)", () => {
    render(<IconButton icon={<CloseIcon />} aria-label="Close" size="lg" />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-[var(--spacing-12)]");
    expect(button.className).toContain("w-[var(--spacing-12)]");
  });

  // -- Disabled state --

  it("renders disabled state", () => {
    render(<IconButton icon={<CloseIcon />} aria-label="Close" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies disabled styling classes", () => {
    render(<IconButton icon={<CloseIcon />} aria-label="Close" disabled />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("disabled:pointer-events-none");
    expect(button.className).toContain(
      "disabled:opacity-[var(--opacity-disabled)]",
    );
  });

  // -- Click handling --

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <IconButton
        icon={<CloseIcon />}
        aria-label="Close"
        onClick={handleClick}
      />,
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <IconButton
        icon={<CloseIcon />}
        aria-label="Close"
        disabled
        onClick={handleClick}
      />,
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // -- className merging --

  it("merges custom className with variant classes", () => {
    render(
      <IconButton
        icon={<CloseIcon />}
        aria-label="Close"
        className="custom-class"
      />,
    );
    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-class");
    expect(button.className).toContain("hover:bg-surface-sunken");
  });

  // -- Ref forwarding --

  it("forwards ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton icon={<CloseIcon />} aria-label="Close" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // -- HTML attributes --

  it("passes through HTML attributes", () => {
    render(
      <IconButton
        icon={<CloseIcon />}
        aria-label="Close"
        type="submit"
        data-testid="submit-icon"
      />,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("data-testid", "submit-icon");
  });
});
