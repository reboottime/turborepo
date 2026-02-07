import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from ".";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: { control: "boolean" },
  },
  args: {
    orientation: "horizontal",
    decorative: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div>
      <div style={{ padding: "1rem" }}>
        <p>Content above</p>
      </div>
      <Separator />
      <div style={{ padding: "1rem" }}>
        <p>Content below</p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", height: "100px", alignItems: "center" }}>
      <div style={{ padding: "0 1rem" }}>
        <p>Left content</p>
      </div>
      <Separator orientation="vertical" />
      <div style={{ padding: "0 1rem" }}>
        <p>Right content</p>
      </div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div
      style={{
        maxWidth: "400px",
        border: "1px solid var(--color-border-default)",
        borderRadius: "8px",
        backgroundColor: "var(--color-surface-base)",
      }}
    >
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Card Title</h3>
        <p
          style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}
        >
          Card description
        </p>
      </div>
      <Separator />
      <div style={{ padding: "1.5rem" }}>
        <p>Card content goes here</p>
      </div>
      <Separator />
      <div style={{ padding: "1.5rem" }}>
        <button
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text-inverse)",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Action
        </button>
      </div>
    </div>
  ),
};

export const InMenu: Story = {
  render: () => (
    <div
      style={{
        width: "200px",
        border: "1px solid var(--color-border-default)",
        borderRadius: "8px",
        backgroundColor: "var(--color-surface-base)",
        padding: "0.5rem",
      }}
    >
      <div
        style={{
          padding: "0.5rem",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Profile
      </div>
      <div
        style={{
          padding: "0.5rem",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Settings
      </div>
      <div style={{ padding: "0.5rem 0" }}>
        <Separator />
      </div>
      <div
        style={{
          padding: "0.5rem",
          cursor: "pointer",
          borderRadius: "4px",
          color: "var(--color-status-error)",
        }}
      >
        Logout
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div>
      <div style={{ padding: "1rem" }}>
        <p>Content above</p>
      </div>
      <Separator className="bg-primary" />
      <div style={{ padding: "1rem" }}>
        <p>Content below with custom blue separator</p>
      </div>
    </div>
  ),
};

export const NonDecorative: Story = {
  args: {
    decorative: false,
  },
  render: (args) => (
    <div>
      <div style={{ padding: "1rem" }}>
        <p>Content above</p>
      </div>
      <Separator {...args} aria-label="Content divider" />
      <div style={{ padding: "1rem" }}>
        <p>Content below (non-decorative separator with aria-label)</p>
      </div>
    </div>
  ),
};
