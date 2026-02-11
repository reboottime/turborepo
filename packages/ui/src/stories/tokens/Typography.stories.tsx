import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design Tokens/3. Typography",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface TypographySampleProps {
  label: string;
  fontSizeVar: string;
  lineHeightVar: string;
  fontWeightVar?: string;
  sampleText?: string;
}

const TypographySample = ({
  label,
  fontSizeVar,
  lineHeightVar,
  fontWeightVar,
  sampleText = "The quick brown fox jumps over the lazy dog",
}: TypographySampleProps) => {
  const computedStyle =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement)
      : null;

  const fontSize = computedStyle?.getPropertyValue(fontSizeVar).trim() || "";
  const lineHeight =
    computedStyle?.getPropertyValue(lineHeightVar).trim() || "";
  const fontWeight = fontWeightVar
    ? computedStyle?.getPropertyValue(fontWeightVar).trim() || ""
    : "";

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
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: `var(${fontSizeVar})`,
          lineHeight: `var(${lineHeightVar})`,
          fontWeight: fontWeightVar ? `var(${fontWeightVar})` : "inherit",
          color: "var(--color-text-primary)",
          marginBottom: "0.75rem",
        }}
      >
        {sampleText}
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          fontFamily: "var(--font-family-mono)",
          color: "var(--color-text-tertiary)",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        <div>
          Font size: {fontSizeVar} = {fontSize}
        </div>
        <div>
          Line height: {lineHeightVar} = {lineHeight}
        </div>
        {fontWeightVar && (
          <div>
            Font weight: {fontWeightVar} = {fontWeight}
          </div>
        )}
      </div>
    </div>
  );
};

interface FontFamilySampleProps {
  name: string;
  variable: string;
  sampleText: string;
}

const FontFamilySection = ({
  name,
  variable,
  sampleText,
}: FontFamilySampleProps) => {
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
        border: "1px solid var(--color-border-default)",
        backgroundColor: "var(--color-surface-base)",
      }}
    >
      <div
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--color-text-secondary)",
          marginBottom: "0.5rem",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: `var(${variable})`,
          fontSize: "1.5rem",
          color: "var(--color-text-primary)",
          marginBottom: "0.75rem",
        }}
      >
        {sampleText}
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          fontFamily: "var(--font-family-mono)",
          color: "var(--color-text-tertiary)",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        <div>{variable}</div>
        <div style={{ wordBreak: "break-all" }}>{value}</div>
      </div>
    </div>
  );
};

interface FontWeightSampleProps {
  name: string;
  variable: string;
  value: string;
}

const FontWeightSample = ({ name, variable, value }: FontWeightSampleProps) => (
  <div
    style={{
      padding: "1rem",
      borderRadius: "0.5rem",
      border: "1px solid var(--color-border-default)",
      backgroundColor: "var(--color-surface-base)",
    }}
  >
    <div
      style={{
        fontWeight: `var(${variable})`,
        fontSize: "1.25rem",
        color: "var(--color-text-primary)",
        marginBottom: "0.5rem",
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
      {variable} = {value}
    </div>
  </div>
);

interface LetterSpacingSampleProps {
  name: string;
  variable: string;
  value: string;
}

const LetterSpacingSample = ({
  name,
  variable,
  value,
}: LetterSpacingSampleProps) => (
  <div
    style={{
      padding: "1rem",
      borderRadius: "0.5rem",
      border: "1px solid var(--color-border-default)",
      backgroundColor: "var(--color-surface-base)",
    }}
  >
    <div
      style={{
        letterSpacing: `var(${variable})`,
        fontSize: "1rem",
        color: "var(--color-text-primary)",
        marginBottom: "0.5rem",
      }}
    >
      ABCDEFGHIJKLMNOPQRSTUVWXYZ
    </div>
    <div
      style={{
        fontSize: "0.75rem",
        fontFamily: "var(--font-family-mono)",
        color: "var(--color-text-tertiary)",
      }}
    >
      {name}: {variable} = {value}
    </div>
  </div>
);

export const AllTypography: Story = {
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
          Typography Tokens
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            marginBottom: "2rem",
          }}
        >
          Typography scale uses a 15px base with consistent spacing and
          hierarchy.
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
          Font Families
        </h2>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))",
            marginBottom: "2rem",
          }}
        >
          <FontFamilySection
            name="Sans Serif (Default)"
            variable="--font-family-sans"
            sampleText="The quick brown fox jumps over the lazy dog"
          />
          <FontFamilySection
            name="Monospace"
            variable="--font-family-mono"
            sampleText="const code = 'example';"
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
          Type Scale
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            marginBottom: "1rem",
          }}
        >
          Font sizes paired with appropriate line heights for optimal
          readability.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <TypographySample
            label="3XL"
            fontSizeVar="--font-size-3xl"
            lineHeightVar="--line-height-3xl"
            sampleText="Large display heading"
          />
          <TypographySample
            label="2XL"
            fontSizeVar="--font-size-2xl"
            lineHeightVar="--line-height-2xl"
            sampleText="Section heading"
          />
          <TypographySample
            label="XL"
            fontSizeVar="--font-size-xl"
            lineHeightVar="--line-height-xl"
            sampleText="Subsection heading"
          />
          <TypographySample
            label="LG"
            fontSizeVar="--font-size-lg"
            lineHeightVar="--line-height-lg"
            sampleText="Large body text or small heading"
          />
          <TypographySample
            label="Base (Default)"
            fontSizeVar="--font-size-base"
            lineHeightVar="--line-height-base"
            sampleText="The quick brown fox jumps over the lazy dog"
          />
          <TypographySample
            label="SM"
            fontSizeVar="--font-size-sm"
            lineHeightVar="--line-height-sm"
            sampleText="Smaller body text or captions"
          />
          <TypographySample
            label="XS"
            fontSizeVar="--font-size-xs"
            lineHeightVar="--line-height-xs"
            sampleText="Fine print, labels, or metadata"
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
          Font Weights
        </h2>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
            marginBottom: "2rem",
          }}
        >
          <FontWeightSample
            name="Normal"
            variable="--font-weight-normal"
            value="400"
          />
          <FontWeightSample
            name="Medium"
            variable="--font-weight-medium"
            value="500"
          />
          <FontWeightSample
            name="Semibold"
            variable="--font-weight-semibold"
            value="600"
          />
          <FontWeightSample
            name="Bold"
            variable="--font-weight-bold"
            value="700"
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
          Letter Spacing (Tracking)
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            marginBottom: "1rem",
          }}
        >
          Adjust spacing between characters for visual hierarchy and
          readability.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <LetterSpacingSample
            name="Tighter"
            variable="--tracking-tighter"
            value="-0.02em"
          />
          <LetterSpacingSample
            name="Tight"
            variable="--tracking-tight"
            value="-0.01em"
          />
          <LetterSpacingSample
            name="Normal"
            variable="--tracking-normal"
            value="0"
          />
          <LetterSpacingSample
            name="Wide"
            variable="--tracking-wide"
            value="0.01em"
          />
          <LetterSpacingSample
            name="Wider"
            variable="--tracking-wider"
            value="0.02em"
          />
          <LetterSpacingSample
            name="Widest"
            variable="--tracking-widest"
            value="0.05em"
          />
        </div>
      </div>
    </div>
  ),
};
