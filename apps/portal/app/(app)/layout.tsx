"use client";

import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import { useAuth } from "@/lib/auth-context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Navigation Header */}
      <header className="border-b border-border-default bg-surface-raised">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-text-inverse text-lg font-bold">
                  P
                </div>
                <span className="text-xl font-semibold">Portal</span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a
                  href="/employees"
                  className="text-sm font-medium text-text-primary hover:text-primary transition-colors"
                >
                  Employees
                </a>
              </nav>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {children}
    </div>
  );
}
