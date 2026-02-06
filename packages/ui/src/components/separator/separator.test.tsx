import { createRef } from "react";
import { render } from "@testing-library/react";
import { Separator } from "./index";

describe("Separator", () => {
  it("renders with default orientation (horizontal)", () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("data-orientation", "horizontal");
  });

  it("renders with vertical orientation", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveAttribute("data-orientation", "vertical");
  });

  // -- Orientation styling --

  it("applies horizontal classes by default", () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    expect(separator.className).toContain("h-[1px]");
    expect(separator.className).toContain("w-full");
  });

  it("applies vertical classes when orientation is vertical", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator.className).toContain("h-full");
    expect(separator.className).toContain("w-[1px]");
  });

  // -- Decorative prop --

  it("is decorative by default (role='none')", () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveAttribute("role", "none");
  });

  it("has separator role when not decorative", () => {
    const { container } = render(<Separator decorative={false} />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveAttribute("role", "separator");
  });

  // -- Styling --

  it("applies border color token", () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    expect(separator.className).toContain("bg-border-default");
  });

  it("applies shrink-0 class", () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    expect(separator.className).toContain("shrink-0");
  });

  // -- className merging --

  it("merges custom className", () => {
    const { container } = render(<Separator className="custom-class" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator.className).toContain("custom-class");
    expect(separator.className).toContain("bg-border-default");
  });

  it("allows custom className to override default classes", () => {
    const { container } = render(<Separator className="bg-red-500" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator.className).toContain("bg-red-500");
    // tailwind-merge should remove bg-border-default
    expect(separator.className).not.toContain("bg-border-default");
  });

  // -- Ref forwarding --

  it("forwards ref to the separator element", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Separator ref={ref} />);
    expect(ref.current).toBe(container.firstChild);
  });

  // -- HTML attributes --

  it("passes through HTML attributes", () => {
    const { container } = render(
      <Separator data-testid="test-separator" aria-label="divider" />,
    );
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveAttribute("data-testid", "test-separator");
    expect(separator).toHaveAttribute("aria-label", "divider");
  });
});
