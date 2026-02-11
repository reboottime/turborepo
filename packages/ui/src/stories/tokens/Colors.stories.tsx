import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design Tokens/2. Colors",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface ColorSwatchProps {
  name: string;
  variable: string;
  description?: string;
}

const ColorSwatch = ({ name, variable, description }: ColorSwatchProps) => {
  const computedStyle =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement)
      : null;
  const value = computedStyle?.getPropertyValue(variable).trim() || "";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.75rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--color-border-default)",
        backgroundColor: "var(--color-surface-base)",
      }}
    >
      <div
        style={{
          width: "4rem",
          height: "4rem",
          borderRadius: "0.5rem",
          backgroundColor: `var(${variable})`,
          border: "1px solid var(--color-border-default)",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: "0.875rem",
            color: "var(--color-text-primary)",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-family-mono)",
            marginTop: "0.25rem",
          }}
        >
          {variable}
        </div>
        {value && (
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-tertiary)",
              fontFamily: "var(--font-family-mono)",
              marginTop: "0.125rem",
            }}
          >
            {value}
          </div>
        )}
        {description && (
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-secondary)",
              marginTop: "0.25rem",
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

interface ColorGroupProps {
  title: string;
  description?: string;
  colors: Array<{
    name: string;
    variable: string;
    description?: string;
  }>;
}

const ColorGroup = ({ title, description, colors }: ColorGroupProps) => (
  <div style={{ marginBottom: "2rem" }}>
    <h2
      style={{
        fontSize: "1.25rem",
        fontWeight: 600,
        marginBottom: "0.5rem",
        color: "var(--color-text-primary)",
      }}
    >
      {title}
    </h2>
    {description && (
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--color-text-secondary)",
          marginBottom: "1rem",
        }}
      >
        {description}
      </p>
    )}
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
      }}
    >
      {colors.map((color) => (
        <ColorSwatch key={color.variable} {...color} />
      ))}
    </div>
  </div>
);

export const AllColors: Story = {
  render: () => (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Color Tokens
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            marginBottom: "2rem",
          }}
        >
          All color tokens support automatic light/dark theming using CSS
          light-dark() function. Toggle the theme in Storybook toolbar to see
          both modes.
        </p>

        <ColorGroup
          title="Surface Colors"
          description="Background colors for different elevation levels. Use these for cards, panels, and page backgrounds."
          colors={[
            {
              name: "Surface Base",
              variable: "--color-surface-base",
              description: "Default background color",
            },
            {
              name: "Surface Raised",
              variable: "--color-surface-raised",
              description: "Elevated surfaces (cards, modals)",
            },
            {
              name: "Surface Overlay",
              variable: "--color-surface-overlay",
              description: "Highest elevation (dropdowns, tooltips)",
            },
            {
              name: "Surface Sunken",
              variable: "--color-surface-sunken",
              description: "Recessed areas (input backgrounds)",
            },
          ]}
        />

        <ColorGroup
          title="Text Colors"
          description="Text colors with varying emphasis levels. Use primary for body text, secondary for less important text, tertiary for hints."
          colors={[
            {
              name: "Text Primary",
              variable: "--color-text-primary",
              description: "Primary text color",
            },
            {
              name: "Text Secondary",
              variable: "--color-text-secondary",
              description: "Secondary text (less emphasis)",
            },
            {
              name: "Text Tertiary",
              variable: "--color-text-tertiary",
              description: "Tertiary text (hints, captions)",
            },
            {
              name: "Text Inverse",
              variable: "--color-text-inverse",
              description: "Text on colored backgrounds",
            },
          ]}
        />

        <ColorGroup
          title="Border Colors"
          description="Border colors for separators and outlines. Use subtle for light dividers, default for visible borders, strong for emphasis."
          colors={[
            {
              name: "Border Default",
              variable: "--color-border-default",
              description: "Standard borders",
            },
            {
              name: "Border Subtle",
              variable: "--color-border-subtle",
              description: "Light dividers",
            },
            {
              name: "Border Strong",
              variable: "--color-border-strong",
              description: "Emphasized borders",
            },
          ]}
        />

        <ColorGroup
          title="Status Colors"
          description="Colors for communicating status and feedback. Use consistently across alerts, badges, and notifications."
          colors={[
            {
              name: "Success",
              variable: "--color-status-success",
              description: "Successful operations",
            },
            {
              name: "Warning",
              variable: "--color-status-warning",
              description: "Warning states",
            },
            {
              name: "Error",
              variable: "--color-status-error",
              description: "Error states",
            },
            {
              name: "Info",
              variable: "--color-status-info",
              description: "Informational messages",
            },
          ]}
        />

        <ColorGroup
          title="Action Colors"
          description="Colors for interactive elements like buttons and links. Include hover and active states."
          colors={[
            {
              name: "Primary",
              variable: "--color-primary",
              description: "Primary action color",
            },
            {
              name: "Primary Hover",
              variable: "--color-primary-hover",
              description: "Primary hover state",
            },
            {
              name: "Primary Active",
              variable: "--color-primary-active",
              description: "Primary active/pressed state",
            },
            {
              name: "Secondary",
              variable: "--color-secondary",
              description: "Secondary action color",
            },
            {
              name: "Secondary Hover",
              variable: "--color-secondary-hover",
              description: "Secondary hover state",
            },
            {
              name: "Destructive",
              variable: "--color-destructive",
              description: "Destructive action color",
            },
            {
              name: "Destructive Hover",
              variable: "--color-destructive-hover",
              description: "Destructive hover state",
            },
            {
              name: "Destructive Active",
              variable: "--color-destructive-active",
              description: "Destructive active/pressed state",
            },
          ]}
        />

        <ColorGroup
          title="Interactive States"
          description="Colors for focus indicators and text selection."
          colors={[
            {
              name: "Focus Ring",
              variable: "--color-focus-ring",
              description: "Focus indicator color (2px min thickness)",
            },
            {
              name: "Selection Background",
              variable: "--color-selection-bg",
              description: "Text selection background",
            },
          ]}
        />

        <ColorGroup
          title="Icon Colors"
          description="Colors for icons in different states. Use default for inactive icons, hover for hover states, active for selected states."
          colors={[
            {
              name: "Icon Default",
              variable: "--color-icon-default",
              description: "Default icon color",
            },
            {
              name: "Icon Hover",
              variable: "--color-icon-hover",
              description: "Icon hover state",
            },
            {
              name: "Icon Active",
              variable: "--color-icon-active",
              description: "Active/selected icon",
            },
            {
              name: "Icon Muted",
              variable: "--color-icon-muted",
              description: "Muted icon color",
            },
          ]}
        />

        <ColorGroup
          title="Overlay Colors"
          description="Colors for modal backdrops and overlays."
          colors={[
            {
              name: "Overlay Backdrop",
              variable: "--color-overlay-backdrop",
              description: "Modal backdrop overlay",
            },
          ]}
        />
      </div>
    </div>
  ),
};
