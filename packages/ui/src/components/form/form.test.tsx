import { createRef } from "react";
import { jest } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./index";
import { Input } from "../input";

// Helper to render a form with react-hook-form
function TestForm({
  onSubmit = () => {},
  defaultValues = { email: "" },
  required = false,
}: {
  onSubmit?: (data: { email: string }) => void;
  defaultValues?: { email: string };
  required?: boolean;
}) {
  const form = useForm({ defaultValues });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          rules={required ? { required: "Email is required" } : undefined}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>Your work email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}

describe("Form", () => {
  // -- Rendering --

  it("renders form field with label, input, and description", () => {
    render(<TestForm />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByText("Your work email address.")).toBeInTheDocument();
  });

  it("associates label with input", () => {
    render(<TestForm />);
    const label = screen.getByText("Email");
    const input = screen.getByPlaceholderText("you@example.com");
    expect(label).toHaveAttribute("for", input.id);
  });

  // -- User interaction --

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const input = screen.getByPlaceholderText("you@example.com");

    await user.type(input, "kate@example.com");
    expect(input).toHaveValue("kate@example.com");
  });

  it("submits form data", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<TestForm onSubmit={handleSubmit} />);

    await user.type(screen.getByPlaceholderText("you@example.com"), "kate@example.com");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        { email: "kate@example.com" },
        expect.anything()
      );
    });
  });

  // -- Validation --

  it("shows error message on validation failure", async () => {
    const user = userEvent.setup();
    render(<TestForm required />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });

  it("sets aria-invalid on input when field has error", async () => {
    const user = userEvent.setup();
    render(<TestForm required />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      const input = screen.getByPlaceholderText("you@example.com");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("applies error styling to label when field has error", async () => {
    const user = userEvent.setup();
    render(<TestForm required />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      const label = screen.getByText("Email");
      expect(label.className).toContain("text-destructive");
    });
  });

  // -- Accessibility --

  it("associates error message with input via aria-describedby", async () => {
    const user = userEvent.setup();
    render(<TestForm required />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      const input = screen.getByPlaceholderText("you@example.com");
      const describedBy = input.getAttribute("aria-describedby") ?? "";
      const errorMessage = screen.getByText("Email is required");
      expect(describedBy).toContain(errorMessage.id);
    });
  });

  it("associates description with input via aria-describedby", () => {
    render(<TestForm />);
    const input = screen.getByPlaceholderText("you@example.com");
    const description = screen.getByText("Your work email address.");
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy).toContain(description.id);
  });

  // -- FormItem --

  it("renders FormItem as a div container", () => {
    render(<TestForm />);
    const label = screen.getByText("Email");
    // FormItem is the parent div containing label, input, description
    const formItem = label.closest("div");
    expect(formItem).toBeInTheDocument();
  });

  it("merges custom className on FormItem", () => {
    function CustomForm() {
      const form = useForm({ defaultValues: { name: "" } });
      return (
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="custom-item">
                <FormControl>
                  <Input {...field} aria-label="name" />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      );
    }
    render(<CustomForm />);
    const input = screen.getByRole("textbox");
    const formItem = input.closest("div");
    expect(formItem?.className).toContain("custom-item");
    expect(formItem?.className).toContain("grid");
  });

  // -- FormMessage hides when no error --

  it("does not render FormMessage when there is no error", () => {
    render(<TestForm />);
    // FormMessage renders null when no error and no children
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });

  // -- Ref forwarding --

  it("forwards ref on FormItem", () => {
    const ref = createRef<HTMLDivElement>();
    function RefForm() {
      const form = useForm({ defaultValues: { name: "" } });
      return (
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem ref={ref}>
                <FormControl>
                  <Input {...field} aria-label="name" />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      );
    }
    render(<RefForm />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
