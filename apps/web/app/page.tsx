import { Button, cn } from "@repo/ui";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui";
import * as math from "@repo/libs/math";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-4xl px-8 py-16">
        <h1 className="text-4xl font-bold tracking-tigh
        b-2">Web App</h1>
        <p className="text-muted-foreground mb-12">
          Turborepo monorepo demo — shared UI components from @repo/ui
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
          <div className="flex gap-4 flex-wrap">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">cn() Utility</h2>
          <p className="text-sm text-muted-foreground mb-4">
            The cn() function from @repo/ui merges Tailwind classes safely —
            conditional classes, overrides, and deduplication all handled.
          </p>
          <div className="flex gap-4">
            <div className={cn("rounded-lg border p-4", "bg-primary text-primary-foreground")}>
              Merged classes
            </div>
            <div className={cn("rounded-lg border p-4", "bg-muted text-muted-foreground")}>
              Conditional classes
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">@repo/libs — Math Utilities</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Shared utility functions from @repo/libs, consumed across apps.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground">add(2, 3)</p>
                <p className="text-2xl font-bold">{math.add(2, 3)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground">multiply(4, 5)</p>
                <p className="text-2xl font-bold">{math.multiply(4, 5)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground">divide(10, 3)</p>
                <p className="text-2xl font-bold">{math.divide(10, 3).toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground">clamp(150, 0, 100)</p>
                <p className="text-2xl font-bold">{math.clamp(150, 0, 100)}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Shared Components</CardTitle>
                <CardDescription>
                  Built with Radix UI, Tailwind CSS v4, and CVA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Components are exported from @repo/ui and consumed by both
                  web and portal apps.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Turborepo Caching</CardTitle>
                <CardDescription>
                  Build once, cache everywhere
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Turborepo caches build outputs so unchanged packages skip
                  rebuilding entirely.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
