import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design Tokens/4. Spacing",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface SpacingTokenProps {
  name: string;
  variable: string;
  value: string;
}

const SpacingToken = ({ name, variable, value }: SpacingTokenProps) => {
  const computedStyle =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement)
      : null;
  const computedValue =
    computedStyle?.getPropertyValue(variable).trim() || value;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--color-border-default)",
        backgroundColor: "var(--color-surface-base)",
      }}
    >
      <div
        style={{
          width: "8rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
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
            fontSize: "0.75rem",
            fontFamily: "var(--font-family-mono)",
            color: "var(--color-text-tertiary)",
          }}
        >
          {computedValue}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: "2rem",
            backgroundColor: "var(--color-primary)",
            width: `var(${variable})`,
            minWidth: "2px",
            borderRadius: "0.25rem",
          }}
        />
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          fontFamily: "var(--font-family-mono)",
          color: "var(--color-text-secondary)",
          width: "10rem",
          textAlign: "right",
        }}
      >
        {variable}
      </div>
    </div>
  );
};

interface SpacingExampleProps {
  title: string;
  description: string;
  spacingVar: string;
  type: "padding" | "gap" | "margin";
}

const SpacingExample = ({
  title,
  description,
  spacingVar,
  type,
}: SpacingExampleProps) => {
  return (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--color-border-default)",
        backgroundColor: "var(--color-surface-base)",
      }}
    >
      <div
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--color-text-secondary)",
          marginBottom: "0.25rem",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          color: "var(--color-text-tertiary)",
          marginBottom: "1rem",
        }}
      >
        {description}
      </div>

      {type === "padding" && (
        <div
          style={{
            backgroundColor: "var(--color-surface-raised)",
            border: "2px dashed var(--color-border-default)",
            display: "inline-block",
          }}
        >
          <div
            style={{
              padding: `var(${spacingVar})`,
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-inverse)",
              fontSize: "0.875rem",
            }}
          >
            Content with {spacingVar} padding
          </div>
        </div>
      )}

      {type === "gap" && (
        <div
          style={{
            display: "flex",
            gap: `var(${spacingVar})`,
            padding: "1rem",
            backgroundColor: "var(--color-surface-raised)",
            border: "2px dashed var(--color-border-default)",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                padding: "0.75rem 1rem",
                backgroundColor: "var(--color-primary)",
                color: "var(--color-text-inverse)",
                fontSize: "0.875rem",
                borderRadius: "0.25rem",
              }}
            >
              Item {i}
            </div>
          ))}
        </div>
      )}

      {type === "margin" && (
        <div
          style={{
            backgroundColor: "var(--color-surface-raised)",
            border: "2px dashed var(--color-border-default)",
            padding: "1rem",
          }}
        >
          <div
            style={{
              margin: `var(${spacingVar})`,
              padding: "0.75rem 1rem",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-inverse)",
              fontSize: "0.875rem",
              borderRadius: "0.25rem",
            }}
          >
            Content with {spacingVar} margin
          </div>
        </div>
      )}
    </div>
  );
};

interface ContainerSizeProps {
  name: string;
  variable: string;
  value: string;
}

const ContainerSize = ({ name, variable, value }: ContainerSizeProps) => {
  const computedStyle =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement)
      : null;
  const computedValue =
    computedStyle?.getPropertyValue(variable).trim() || value;

  return (
    <div
      style={{
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            fontSize: "0.75rem",
            fontFamily: "var(--font-family-mono)",
            color: "var(--color-text-tertiary)",
          }}
        >
          {variable} = {computedValue}
        </div>
      </div>
      <div
        style={{
          height: "3rem",
          width: computedValue,
          maxWidth: "100%",
          backgroundColor: "var(--color-primary)",
          borderRadius: "0.5rem",
          opacity: 0.7,
        }}
      />
    </div>
  );
};

export const AllSpacing: Story = {
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
          Spacing Tokens
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            marginBottom: "2rem",
          }}
        >
          Spacing scale based on 8px grid for consistent layouts. Use these
          tokens for padding, margin, and gaps.
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
          Spacing Scale
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            marginBottom: "1rem",
          }}
        >
          Base scale from 0 to 16 (0px to 64px). Use these for consistent
          spacing throughout the UI.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          <SpacingToken name="0" variable="--spacing-0" value="0px" />
          <SpacingToken name="1" variable="--spacing-1" value="4px" />
          <SpacingToken name="1.5" variable="--spacing-1-5" value="6px" />
          <SpacingToken name="2" variable="--spacing-2" value="8px" />
          <SpacingToken name="3" variable="--spacing-3" value="12px" />
          <SpacingToken name="4" variable="--spacing-4" value="16px" />
          <SpacingToken name="5" variable="--spacing-5" value="20px" />
          <SpacingToken name="6" variable="--spacing-6" value="24px" />
          <SpacingToken name="8" variable="--spacing-8" value="32px" />
          <SpacingToken name="10" variable="--spacing-10" value="40px" />
          <SpacingToken name="12" variable="--spacing-12" value="48px" />
          <SpacingToken name="16" variable="--spacing-16" value="64px" />
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
          Usage Examples
        </h2>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            marginBottom: "2rem",
          }}
        >
          <SpacingExample
            title="Padding"
            description="Internal spacing within components"
            spacingVar="--spacing-4"
            type="padding"
          />
          <SpacingExample
            title="Gap"
            description="Space between flex/grid items"
            spacingVar="--spacing-3"
            type="gap"
          />
          <SpacingExample
            title="Margin"
            description="External spacing between components"
            spacingVar="--spacing-6"
            type="margin"
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
          Container Widths
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            marginBottom: "1rem",
          }}
        >
          Maximum widths for content containers at different breakpoints.
        </p>
        <div style={{ marginBottom: "2rem" }}>
          <ContainerSize name="Small" variable="--container-sm" value="640px" />
          <ContainerSize
            name="Medium"
            variable="--container-md"
            value="768px"
          />
          <ContainerSize
            name="Large"
            variable="--container-lg"
            value="1024px"
          />
          <ContainerSize
            name="Extra Large"
            variable="--container-xl"
            value="1280px"
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
          Breakpoints
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            marginBottom: "1rem",
          }}
        >
          Responsive breakpoints for media queries. Matches Tailwind&apos;s
          default breakpoints.
        </p>
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
          }}
        >
          {[
            { name: "SM", variable: "--breakpoint-sm", value: "640px" },
            { name: "MD", variable: "--breakpoint-md", value: "768px" },
            { name: "LG", variable: "--breakpoint-lg", value: "1024px" },
            { name: "XL", variable: "--breakpoint-xl", value: "1280px" },
            { name: "2XL", variable: "--breakpoint-2xl", value: "1536px" },
          ].map((bp) => {
            const computedStyle =
              typeof window !== "undefined"
                ? getComputedStyle(document.documentElement)
                : null;
            const computedValue =
              computedStyle?.getPropertyValue(bp.variable).trim() || bp.value;

            return (
              <div
                key={bp.name}
                style={{
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--color-border-default)",
                  backgroundColor: "var(--color-surface-base)",
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
                  {bp.name}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-family-mono)",
                    color: "var(--color-text-secondary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {bp.variable}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-family-mono)",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  {computedValue}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ),
};
