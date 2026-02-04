import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { Label } from "./index";

describe("Label", () => {
  it("renders with text content", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders as a label element", () => {
    render(<Label>Name</Label>);
    expect(screen.getByText("Name").tagName).toBe("LABEL");
  });

  it("associates with input via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );
    expect(screen.getByText("Email")).toHaveAttribute("for", "email");
  });

  it("merges custom className", () => {
    render(<Label className="custom-class">Test</Label>);
    const label = screen.getByText("Test");
    expect(label.className).toContain("custom-class");
    expect(label.className).toContain("text-sm");
  });

  it("forwards ref to the label element", () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Ref</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it("passes through HTML attributes", () => {
    render(<Label data-testid="my-label">Test</Label>);
    expect(screen.getByTestId("my-label")).toBeInTheDocument();
  });
});
