import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-3 min-w-0">
          <span className="font-semibold text-base sm:text-lg truncate min-w-0">Explain This Screenshot</span>
          <Link href="/dashboard" className="flex-shrink-0">
            <Button className="min-h-[44px] sm:min-h-10">Go to Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-20">
        <section className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Understand screenshots. Check if it’s legit.
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Upload a screenshot for a plain-English explanation, or paste a message or link to see if it’s safe. Simple, calm, and built for everyone.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>Explain a screenshot</CardTitle>
              <CardDescription>
                Upload an image and get a clear explanation of what it means and what to do next.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/upload">
                <Button className="w-full" size="lg">
                  Upload Screenshot
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>Is this legit?</CardTitle>
              <CardDescription>
                Paste a message, email, or URL and we’ll flag scam signals and suggest next steps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/legit-check">
                <Button variant="outline" className="w-full" size="lg">
                  Check message or link
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 text-center text-sm text-muted-foreground max-w-xl mx-auto">
          <p>
            We explain things in plain English and keep a calm, non-alarmist tone. No technical jargon—just what you need to know and what to do next.
          </p>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          Explain This Screenshot — Built for clarity and trust.
        </div>
      </footer>
    </div>
  );
}
