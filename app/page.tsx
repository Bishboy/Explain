import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-2 border-primary/10 bg-white/95 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 min-w-0 max-w-6xl">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="font-semibold text-base sm:text-lg truncate text-foreground">
              Explain This Screenshot
            </span>
          </Link>
          <Link href="/dashboard" className="flex-shrink-0">
            <Button className="min-h-[44px] sm:min-h-10">
              Dashboard <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="gradient-mesh relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 max-w-6xl">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/15 text-primary font-semibold text-sm uppercase tracking-wider mb-6 border border-primary/20">
                Screenshot clarity • Scam detection
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-5 sm:mb-6 leading-[1.1]">
                Understand screenshots.{" "}
                <span className="text-primary drop-shadow-sm">Check if it&apos;s legit.</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Upload a screenshot for a plain-English explanation, or paste a message or link to see if it&apos;s safe. Simple, calm, and built for everyone.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            <Card className="group card-glow hover:card-glow-hover hover:border-primary/30 transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-2 ring-primary/20 group-hover:bg-primary/25 group-hover:ring-primary/30 transition-all">
                    <ImagePlus className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Explain a screenshot</CardTitle>
                    <CardDescription className="text-[15px] mt-1 leading-relaxed">
                      Upload an image and get a clear explanation of what it means and what to do next.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/dashboard/upload">
                  <Button className="w-full" size="lg">
                    Upload Screenshot
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group card-glow hover:card-glow-hover hover:border-primary/30 transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-2 ring-primary/20 group-hover:bg-primary/25 group-hover:ring-primary/30 transition-all">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Is this legit?</CardTitle>
                    <CardDescription className="text-[15px] mt-1 leading-relaxed">
                      Paste a message, email, or URL and we&apos;ll flag scam signals and suggest next steps.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/dashboard/legit-check">
                  <Button variant="outline" className="w-full" size="lg">
                    Check message or link
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-20 md:mt-28 max-w-2xl mx-auto">
            <div className="rounded-2xl border-2 border-primary/15 bg-primary/5 px-6 sm:px-8 py-8 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <p className="text-muted-foreground text-[15px] sm:text-base leading-relaxed">
                We explain things in plain English and keep a calm, non-alarmist tone. No technical jargon—just what you need to know and what to do next.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-primary/10 bg-secondary/50 py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground/80">Explain This Screenshot</span>
          <span>Built for clarity and trust</span>
        </div>
      </footer>
    </div>
  );
}
