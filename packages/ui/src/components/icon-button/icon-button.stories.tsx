import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from ".";

// Simple icon components for demonstration
const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="12" y1="4" x2="4" y2="12" />
    <line x1="4" y1="4" x2="12" y2="12" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="8" y1="4" x2="8" y2="12" />
    <line x1="4" y1="8" x2="12" y2="8" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M3 4h10M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M6 7v4M10 7v4M4 4h8v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4z" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    icon: <CloseIcon />,
    "aria-label": "Close",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "ghost",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Primary: Story = {
  args: {
    variant: "default",
    icon: <PlusIcon />,
    "aria-label": "Add item",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    icon: <TrashIcon />,
    "aria-label": "Delete",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {(["default", "destructive", "outline", "ghost"] as const).map(
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
              <IconButton
                key={size}
                variant={variant}
                size={size}
                icon={<CloseIcon />}
                aria-label="Close"
              />
            ))}
            <IconButton
              variant={variant}
              icon={<CloseIcon />}
              aria-label="Close"
              disabled
            />
          </div>
        ),
      )}
    </div>
  ),
};

export const WithDifferentIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <IconButton icon={<CloseIcon />} aria-label="Close" />
      <IconButton icon={<PlusIcon />} aria-label="Add" variant="outline" />
      <IconButton
        icon={<TrashIcon />}
        aria-label="Delete"
        variant="destructive"
      />
    </div>
  ),
};

export const InDialog: Story = {
  render: () => (
    <div
      style={{
        position: "relative",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "1rem" }}>Dialog Title</h3>
        <IconButton icon={<CloseIcon />} aria-label="Close dialog" />
      </div>
      <p style={{ margin: 0, fontSize: "0.875rem", color: "#737373" }}>
        IconButton is commonly used for close buttons in dialogs, modals, and
        drawers.
      </p>
    </div>
  ),
};
