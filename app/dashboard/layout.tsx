import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumUpsell } from "@/components/premium-upsell";
import { LayoutDashboard, ImagePlus, ShieldCheck } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <aside className="md:w-56 lg:w-64 border-b md:border-b-0 md:border-r border-border/50 bg-card/50 backdrop-blur-sm p-4 flex-shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-base mb-8 truncate text-foreground hover:text-primary transition-colors"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
            <ShieldCheck className="h-4 w-4" />
          </div>
          Explain This Screenshot
        </Link>
        <nav className="space-y-0.5">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 min-h-[40px] text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg px-3"
            >
              <LayoutDashboard className="h-4 w-4 shrink-0 opacity-70" />
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/upload">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 min-h-[40px] text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg px-3"
            >
              <ImagePlus className="h-4 w-4 shrink-0 opacity-70" />
              Upload Screenshot
            </Button>
          </Link>
          <Link href="/dashboard/legit-check">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 min-h-[40px] text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg px-3"
            >
              <ShieldCheck className="h-4 w-4 shrink-0 opacity-70" />
              Is This Legit?
            </Button>
          </Link>
        </nav>
        <div className="mt-8 hidden sm:block">
          <PremiumUpsell />
        </div>
      </aside>

      <main className="flex-1 p-5 sm:p-6 lg:p-8 overflow-auto min-w-0 max-w-4xl">
        {children}
      </main>

      <section className="hidden lg:block lg:w-80 xl:w-96 border-l border-border/50 bg-muted/10 p-5 flex-shrink-0">
        <div className="sticky top-20">
          <Card className="border-border/50 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Results</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Your explanation or legit check will appear here after you run an analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use &quot;Upload Screenshot&quot; or &quot;Is This Legit?&quot; to get started.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
