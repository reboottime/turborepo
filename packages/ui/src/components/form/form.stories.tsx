import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from ".";
import { Input } from "../input";

const meta: Meta = {
  title: "Components/Form",
};

export default meta;
type Story = StoryObj;

function BasicFormDemo() {
  const form = useForm({
    defaultValues: { email: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
        style={{
          maxWidth: "24rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "Email is required" }}
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
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "white",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Submit
        </button>
      </form>
    </Form>
  );
}

export const Basic: Story = {
  render: () => <BasicFormDemo />,
};

function MultiFieldFormDemo() {
  const form = useForm({
    defaultValues: { name: "", email: "", message: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
        style={{
          maxWidth: "24rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>
                We&apos;ll never share your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "white",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Submit
        </button>
      </form>
    </Form>
  );
}

export const MultipleFields: Story = {
  render: () => <MultiFieldFormDemo />,
};
