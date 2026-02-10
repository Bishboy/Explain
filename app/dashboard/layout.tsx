import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumUpsell } from "@/components/premium-upsell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="md:w-64 border-b md:border-b-0 md:border-r bg-card p-3 sm:p-4 flex-shrink-0">
        <Link href="/" className="block font-semibold text-base sm:text-lg mb-4 md:mb-6 truncate">
          Explain This Screenshot
        </Link>
        <nav className="space-y-1 sm:space-y-2">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start min-h-[44px] sm:min-h-0">
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/upload">
            <Button variant="ghost" className="w-full justify-start min-h-[44px] sm:min-h-0">
              Upload Screenshot
            </Button>
          </Link>
          <Link href="/dashboard/legit-check">
            <Button variant="ghost" className="w-full justify-start min-h-[44px] sm:min-h-0">
              Is This Legit?
            </Button>
          </Link>
        </nav>
        <div className="mt-4 md:mt-6 hidden sm:block">
          <PremiumUpsell />
        </div>
      </aside>

      <main className="flex-1 p-3 sm:p-4 md:p-8 overflow-auto min-w-0">
        {children}
      </main>

      <section className="hidden md:block md:w-72 border-l bg-muted/30 p-4 flex-shrink-0">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base">Results</CardTitle>
            <CardDescription className="text-xs">
              Your explanation or legit check will appear on the page after you run an analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground">
              Use “Upload Screenshot” or “Is This Legit?” to get started.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
