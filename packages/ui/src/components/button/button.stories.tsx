import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Link: Story = {
  args: { variant: "link", children: "Learn more" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {(["default", "destructive", "outline", "ghost", "link"] as const).map(
        (variant) => (
          <div
            key={variant}
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
          >
            <span
              style={{ width: "5rem", fontSize: "0.75rem", color: "#737373" }}
            >
              {variant}
            </span>
            {(["sm", "default", "lg"] as const).map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size}
              </Button>
            ))}
            <Button variant={variant} disabled>
              disabled
            </Button>
          </div>
        ),
      )}
    </div>
  ),
};
