import { Button } from "@repo/ui";
import { Card, CardHeader, CardTitle, CardDescription } from "@repo/ui";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-surface-base text-text-primary">
      <main className="mx-auto max-w-4xl px-8 py-16">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Portal</h1>
        <p className="text-text-secondary mb-12">
          Admin dashboard — same shared components, different app
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="flex gap-4 flex-wrap">
            <Button>Create New</Button>
            <Button variant="outline">Export</Button>
            <Button variant="ghost">Settings</Button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>12</CardTitle>
                <CardDescription>Active Projects</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>48</CardTitle>
                <CardDescription>Tasks This Week</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>96%</CardTitle>
                <CardDescription>Build Pass Rate</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
