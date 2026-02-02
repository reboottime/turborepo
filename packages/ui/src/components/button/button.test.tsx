import { createRef } from "react";
import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./index";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("renders as a button element", () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole("button")).toBeInstanceOf(HTMLButtonElement);
  });

  // -- Variants --

  it("applies default variant classes", () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-primary");
  });

  it("applies outline variant classes", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border");
    expect(button.className).toContain("bg-background");
  });

  it("applies ghost variant classes", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button");
    expect(button.className).not.toContain("bg-primary");
    expect(button.className).not.toContain("border");
  });

  // -- Sizes --

  it("applies default size classes", () => {
    render(<Button>Default Size</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-10");
  });

  it("applies sm size classes", () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-9");
  });

  it("applies lg size classes", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-11");
  });

  // -- Disabled state --

  it("renders disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies disabled styling classes", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("disabled:pointer-events-none");
    expect(button.className).toContain("disabled:opacity-50");
  });

  // -- Click handling --

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click
      </Button>
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // -- className merging --

  it("merges custom className with variant classes", () => {
    render(<Button className="custom-class">Merge</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-class");
    expect(button.className).toContain("bg-primary");
  });

  it("allows custom className to override variant classes", () => {
    render(<Button className="px-8">Override</Button>);
    const button = screen.getByRole("button");
    // tailwind-merge should resolve the conflict: custom px-8 wins over default px-4
    expect(button.className).toContain("px-8");
    expect(button.className).not.toContain("px-4");
  });

  // -- Ref forwarding --

  it("forwards ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // -- HTML attributes --

  it("passes through HTML attributes", () => {
    render(
      <Button type="submit" aria-label="submit form">
        Submit
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("aria-label", "submit form");
  });
});
