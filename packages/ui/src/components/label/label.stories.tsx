import type { Meta, StoryObj } from "@storybook/react";
import { Label } from ".";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  argTypes: {
    children: { control: "text" },
  },
  args: {
    children: "Email address",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Label htmlFor="email">Email address</Label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        style={{
          padding: "0.5rem 0.75rem",
          border: "1px solid #e5e5e5",
          borderRadius: "0.375rem",
          fontSize: "0.875rem",
        }}
      />
    </div>
  ),
};
