import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus, ShieldCheck, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2 text-[15px]">
          Choose how you&apos;d like to use the app: explain a screenshot or check if something is legit.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="group border-2 border-border/70 hover:border-primary/30 hover:shadow-xl transition-all duration-300 shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-4 mb-2">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary ring-2 ring-primary/20 group-hover:bg-primary/30 transition-all">
                <ImagePlus className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Upload Screenshot</CardTitle>
                <CardDescription className="text-sm mt-1 leading-relaxed">
                  Upload an image (PNG or JPG) to get a plain-English explanation: what it means, why you&apos;re seeing it, risk level, and what to do next.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/upload">
              <Button className="w-full sm:w-auto">
                Upload Screenshot <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group border-2 border-border/70 hover:border-primary/30 hover:shadow-xl transition-all duration-300 shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-4 mb-2">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary ring-2 ring-primary/20 group-hover:bg-primary/30 transition-all">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Is This Legit?</CardTitle>
                <CardDescription className="text-sm mt-1 leading-relaxed">
                  Paste a message, email, or URL. We&apos;ll analyze it for scam signals and give you a legit score and clear next steps.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/legit-check">
              <Button variant="outline" className="w-full sm:w-auto">
                Check message or link <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
