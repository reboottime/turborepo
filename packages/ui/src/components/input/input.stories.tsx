import type { Meta, StoryObj } from "@storybook/react";
import { Input } from ".";
import { Label } from "../label";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search"],
    },
  },
  args: {
    placeholder: "Enter text...",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input" },
};

export const WithValue: Story = {
  args: { defaultValue: "kate@example.com" },
};

export const Password: Story = {
  args: { type: "password", placeholder: "Enter password..." },
};

export const Invalid: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Label htmlFor="invalid-email" style={{ color: "#ef4444" }}>
        Email
      </Label>
      <Input
        id="invalid-email"
        type="email"
        aria-invalid="true"
        placeholder="you@example.com"
        defaultValue="not-an-email"
      />
      <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>
        Please enter a valid email address.
      </p>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "20rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Label>Default</Label>
        <Input placeholder="Default input" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Label>Disabled</Label>
        <Input disabled placeholder="Disabled input" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Label style={{ color: "#ef4444" }}>Invalid</Label>
        <Input aria-invalid="true" defaultValue="bad value" />
      </div>
    </div>
  ),
};
