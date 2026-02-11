import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design Tokens/5. Elevation",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface ShadowCardProps {
  name: string;
  variable: string;
  description: string;
}

const ShadowCard = ({ name, variable, description }: ShadowCardProps) => {
  const computedStyle =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement)
      : null;
  const value = computedStyle?.getPropertyValue(variable).trim() || "";

  return (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: "0.5rem",
        backgroundColor: "var(--color-surface-base)",
        border: "1px solid var(--color-border-default)",
      }}
    >
      <div
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          marginBottom: "0.25rem",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          color: "var(--color-text-secondary)",
          marginBottom: "1rem",
        }}
      >
        {description}
      </div>
      <div
        style={{
          padding: "2rem",
          backgroundColor: "var(--color-surface-raised)",
          borderRadius: "0.5rem",
          boxShadow: `var(${variable})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.875rem",
          color: "var(--color-text-secondary)",
          minHeight: "6rem",
        }}
      >
        Example element
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          fontFamily: "var(--font-family-mono)",
          color: "var(--color-text-tertiary)",
          marginTop: "1rem",
          wordBreak: "break-all",
        }}
      >
        <div style={{ marginBottom: "0.25rem" }}>{variable}</div>
        {value && <div style={{ opacity: 0.7 }}>{value}</div>}
      </div>
    </div>
  );
};

interface ZIndexCardProps {
  name: string;
  variable: string;
  value: string;
  description: string;
}

const ZIndexCard = ({
  name,
  variable,
  value,
  description,
}: ZIndexCardProps) => {
  const computedStyle =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement)
      : null;
  const computedValue =
    computedStyle?.getPropertyValue(variable).trim() || value;

  return (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: "0.5rem",
        backgroundColor: "var(--color-surface-base)",
        border: "1px solid var(--color-border-default)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "0.5rem",
        }}
      >
        <div
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--color-text-primary)",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            fontFamily: "var(--font-family-mono)",
            color: "var(--color-primary)",
          }}
        >
          {computedValue}
        </div>
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          color: "var(--color-text-secondary)",
          marginBottom: "0.5rem",
        }}
      >
        {description}
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          fontFamily: "var(--font-family-mono)",
          color: "var(--color-text-tertiary)",
        }}
      >
        {variable}
      </div>
    </div>
  );
};

interface StackingContextVisualizerProps {
  layers: Array<{
    name: string;
    variable: string;
    color: string;
  }>;
}

const StackingContextVisualizer = ({
  layers,
}: StackingContextVisualizerProps) => {
  return (
    <div
      style={{
        position: "relative",
        height: "20rem",
        backgroundColor: "var(--color-surface-sunken)",
        borderRadius: "0.5rem",
        border: "1px solid var(--color-border-default)",
        overflow: "hidden",
      }}
    >
      {layers.map((layer, index) => {
        const computedStyle =
          typeof window !== "undefined"
            ? getComputedStyle(document.documentElement)
            : null;
        const zIndexValue =
          computedStyle?.getPropertyValue(layer.variable).trim() || "0";

        return (
          <div
            key={layer.name}
            style={{
              position: "absolute",
              left: `${index * 2}rem`,
              top: `${index * 2}rem`,
              width: "12rem",
              height: "8rem",
              backgroundColor: layer.color,
              borderRadius: "0.5rem",
              padding: "1rem",
              zIndex: zIndexValue,
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--color-border-default)",
            }}
          >
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "0.25rem",
              }}
            >
              {layer.name}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                fontFamily: "var(--font-family-mono)",
                color: "var(--color-text-secondary)",
                marginBottom: "0.125rem",
              }}
            >
              z-index: {zIndexValue}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                fontFamily: "var(--font-family-mono)",
                color: "var(--color-text-tertiary)",
              }}
            >
              {layer.variable}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const AllElevation: Story = {
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
          Elevation Tokens
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            marginBottom: "2rem",
          }}
        >
          Shadows and z-index values for creating visual hierarchy and depth.
        </p>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "1rem",
            marginTop: "2rem",
            color: "var(--color-text-primary)",
          }}
        >
          Shadow Tokens
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            marginBottom: "1rem",
          }}
        >
          Use shadows to create elevation and visual hierarchy. Each shadow
          level represents a different elevation distance from the page.
        </p>
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
            marginBottom: "2rem",
          }}
        >
          <ShadowCard
            name="XS"
            variable="--shadow-xs"
            description="Subtle elevation for cards and containers"
          />
          <ShadowCard
            name="SM"
            variable="--shadow-sm"
            description="Low elevation for interactive elements"
          />
          <ShadowCard
            name="MD"
            variable="--shadow-md"
            description="Medium elevation for dropdowns"
          />
          <ShadowCard
            name="LG"
            variable="--shadow-lg"
            description="High elevation for dialogs and popovers"
          />
          <ShadowCard
            name="XL"
            variable="--shadow-xl"
            description="Highest elevation for modal overlays"
          />
          <ShadowCard
            name="Focus"
            variable="--shadow-focus"
            description="Focus ring indicator (3px ring, 0.2 opacity)"
          />
        </div>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "1rem",
            marginTop: "2rem",
            color: "var(--color-text-primary)",
          }}
        >
          Z-Index Hierarchy
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            marginBottom: "1rem",
          }}
        >
          Z-index values define stacking order. Higher values appear in front of
          lower values. Use these tokens to maintain consistent layering across
          the application.
        </p>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
            marginBottom: "2rem",
          }}
        >
          <ZIndexCard
            name="Base"
            variable="--z-base"
            value="0"
            description="Default stacking context for normal content"
          />
          <ZIndexCard
            name="Sticky"
            variable="--z-sticky"
            value="20"
            description="Sticky headers and navigation"
          />
          <ZIndexCard
            name="Dialog"
            variable="--z-dialog"
            value="40"
            description="Modal dialogs and overlays"
          />
          <ZIndexCard
            name="Dropdown"
            variable="--z-dropdown"
            value="50"
            description="Dropdown menus and popovers (above dialogs since they can appear inside dialogs)"
          />
          <ZIndexCard
            name="Toast"
            variable="--z-toast"
            value="60"
            description="Toast notifications (highest priority)"
          />
        </div>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "1rem",
            marginTop: "2rem",
            color: "var(--color-text-primary)",
          }}
        >
          Stacking Context Visualization
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            marginBottom: "1rem",
          }}
        >
          Visual representation of how z-index values create stacking order.
          Elements with higher z-index values appear in front of elements with
          lower values.
        </p>
        <StackingContextVisualizer
          layers={[
            {
              name: "Base",
              variable: "--z-base",
              color: "var(--color-surface-base)",
            },
            {
              name: "Sticky",
              variable: "--z-sticky",
              color: "var(--color-surface-raised)",
            },
            {
              name: "Dialog",
              variable: "--z-dialog",
              color: "var(--color-surface-overlay)",
            },
            {
              name: "Dropdown",
              variable: "--z-dropdown",
              color: "hsl(210, 100%, 95%)",
            },
            {
              name: "Toast",
              variable: "--z-toast",
              color: "hsl(210, 100%, 90%)",
            },
          ]}
        />

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            backgroundColor: "var(--color-surface-raised)",
            border: "1px solid var(--color-border-default)",
          }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Usage Guidelines
          </h3>
          <ul
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              paddingLeft: "1.5rem",
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <li>
              <strong>Always use token variables</strong> instead of hardcoded
              values to maintain consistent layering
            </li>
            <li>
              <strong>Pair shadows with z-index</strong> for realistic elevation
              (higher z-index = larger shadow)
            </li>
            <li>
              <strong>Dropdown z-index is higher than dialog</strong> because
              dropdowns can appear inside dialogs
            </li>
            <li>
              <strong>Toast has highest priority</strong> to ensure
              notifications are never hidden
            </li>
            <li>
              <strong>Use focus shadow</strong> for keyboard focus indicators
              (WCAG 2.4.13 compliance)
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
};
