import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./index";

// -- Card --

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders as a div element", () => {
    render(<Card data-testid="card">content</Card>);
    expect(screen.getByTestId("card").tagName).toBe("DIV");
  });

  it("applies base styling classes", () => {
    render(<Card data-testid="card">content</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("rounded-[var(--radius-lg)]");
    expect(card.className).toContain("border");
  });

  it("applies default raised surface variant", () => {
    render(<Card data-testid="card">content</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("bg-surface-raised");
    expect(card.className).toContain("shadow-sm");
  });

  it("applies base surface variant", () => {
    render(
      <Card data-testid="card" surface="base">
        content
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card.className).toContain("shadow-xs");
  });

  it("applies overlay surface variant", () => {
    render(
      <Card data-testid="card" surface="overlay">
        content
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card.className).toContain("shadow-md");
  });

  it("applies sunken surface variant", () => {
    render(
      <Card data-testid="card" surface="sunken">
        content
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card.className).toContain("bg-surface-sunken");
    expect(card.className).toContain("shadow-none");
  });

  it("merges custom className", () => {
    render(
      <Card data-testid="card" className="my-custom">
        content
      </Card>,
    );
    const card = screen.getByTestId("card");
    expect(card.className).toContain("my-custom");
    expect(card.className).toContain("rounded-[var(--radius-lg)]");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref}>content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("passes through HTML attributes", () => {
    render(
      <Card data-testid="card" aria-label="info card">
        content
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveAttribute(
      "aria-label",
      "info card",
    );
  });
});

// -- CardHeader --

describe("CardHeader", () => {
  it("renders children", () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("applies flex column layout", () => {
    render(<CardHeader data-testid="header">content</CardHeader>);
    const header = screen.getByTestId("header");
    expect(header.className).toContain("flex");
    expect(header.className).toContain("flex-col");
  });

  it("merges custom className", () => {
    render(
      <CardHeader data-testid="header" className="extra">
        content
      </CardHeader>,
    );
    expect(screen.getByTestId("header").className).toContain("extra");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<CardHeader ref={ref}>content</CardHeader>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// -- CardTitle --

describe("CardTitle", () => {
  it("renders children", () => {
    render(<CardTitle>My Title</CardTitle>);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("renders as an h3 heading", () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("applies heading styling", () => {
    render(<CardTitle data-testid="title">Title</CardTitle>);
    const title = screen.getByTestId("title");
    expect(title.className).toContain("text-[length:var(--font-size-2xl)]");
    expect(title.className).toContain("font-semibold");
    expect(title.className).toContain("tracking-[var(--tracking-tight)]");
  });

  it("merges custom className", () => {
    render(
      <CardTitle data-testid="title" className="text-red-500">
        Title
      </CardTitle>,
    );
    expect(screen.getByTestId("title").className).toContain("text-red-500");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<CardTitle ref={ref}>Title</CardTitle>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });
});

// -- CardDescription --

describe("CardDescription", () => {
  it("renders children", () => {
    render(<CardDescription>Description text</CardDescription>);
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("renders as a paragraph element", () => {
    render(<CardDescription data-testid="desc">text</CardDescription>);
    expect(screen.getByTestId("desc").tagName).toBe("P");
  });

  it("applies muted text styling", () => {
    render(<CardDescription data-testid="desc">text</CardDescription>);
    const desc = screen.getByTestId("desc");
    expect(desc.className).toContain("text-[length:var(--font-size-sm)]");
    expect(desc.className).toContain("text-text-secondary");
  });

  it("merges custom className", () => {
    render(
      <CardDescription data-testid="desc" className="italic">
        text
      </CardDescription>,
    );
    expect(screen.getByTestId("desc").className).toContain("italic");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<CardDescription ref={ref}>text</CardDescription>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});

// -- CardContent --

describe("CardContent", () => {
  it("renders children", () => {
    render(<CardContent>Body content</CardContent>);
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("applies padding top class", () => {
    render(<CardContent data-testid="content">content</CardContent>);
    expect(screen.getByTestId("content").className).toContain(
      "pt-[var(--spacing-4)]",
    );
  });

  it("merges custom className", () => {
    render(
      <CardContent data-testid="content" className="px-8">
        content
      </CardContent>,
    );
    expect(screen.getByTestId("content").className).toContain("px-8");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<CardContent ref={ref}>content</CardContent>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// -- Composition --

describe("Card composition", () => {
  it("renders all sub-components together", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Project Alpha</CardTitle>
          <CardDescription>A great project</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Details here</p>
        </CardContent>
      </Card>,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "Project Alpha" }),
    ).toBeInTheDocument();
    expect(screen.getByText("A great project")).toBeInTheDocument();
    expect(screen.getByText("Details here")).toBeInTheDocument();
  });
});
