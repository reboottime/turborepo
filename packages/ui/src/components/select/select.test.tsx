import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
} from "./index";

interface SimpleSelectProps {
  disabled?: boolean;
}

describe("Select", () => {
  const SimpleSelect = ({ disabled = false }: SimpleSelectProps) => (
    <Select>
      <SelectTrigger disabled={disabled}>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );

  it("renders the trigger with placeholder", () => {
    render(<SimpleSelect />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("renders as a combobox element", () => {
    render(<SimpleSelect />);
    expect(screen.getByRole("combobox")).toBeInstanceOf(HTMLButtonElement);
  });

  // -- Variants --

  it("applies default variant classes to trigger", () => {
    render(<SimpleSelect />);
    const trigger = screen.getByRole("combobox");
    expect(trigger.className).toContain("form-field-base");
  });

  it("applies error variant classes to trigger", () => {
    render(
      <Select>
        <SelectTrigger variant="error">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test">Test</SelectItem>
        </SelectContent>
      </Select>,
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger.className).toContain("border-status-error");
  });

  // -- Controlled value --

  it("displays selected value", () => {
    render(
      <Select defaultValue="option2">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>,
    );

    // The selected value should be shown in the trigger
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  // -- Disabled state --

  it("renders disabled state", () => {
    render(<SimpleSelect disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("applies disabled styling classes", () => {
    render(<SimpleSelect disabled />);
    const trigger = screen.getByRole("combobox");
    expect(trigger.className).toContain("form-field-disabled");
  });

  // -- className merging --

  it("merges custom className with variant classes", () => {
    render(
      <Select>
        <SelectTrigger className="custom-class">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test">Test</SelectItem>
        </SelectContent>
      </Select>,
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger.className).toContain("custom-class");
    expect(trigger.className).toContain("form-field-base");
  });

  it("allows custom className to be appended", () => {
    render(
      <Select>
        <SelectTrigger className="h-12">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test">Test</SelectItem>
        </SelectContent>
      </Select>,
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger.className).toContain("h-12");
    expect(trigger.className).toContain("form-field-base");
  });

  // -- Ref forwarding --

  it("forwards ref to the trigger element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Select>
        <SelectTrigger ref={ref}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test">Test</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // -- HTML attributes --

  it("passes through HTML attributes to trigger", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Choose option" data-testid="select-trigger">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test">Test</SelectItem>
        </SelectContent>
      </Select>,
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-label", "Choose option");
    expect(trigger).toHaveAttribute("data-testid", "select-trigger");
  });

  // -- Variant exports --

  it("exports selectTriggerVariants for variant styling", () => {
    expect(selectTriggerVariants).toBeDefined();
    expect(typeof selectTriggerVariants).toBe("function");
  });
});
