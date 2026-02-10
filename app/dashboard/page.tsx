import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Choose how you’d like to use the app: explain a screenshot or check if something is legit.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Screenshot</CardTitle>
            <CardDescription>
              Upload an image (PNG or JPG) to get a plain-English explanation: what it means, why you’re seeing it, risk level, and what to do next.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/upload">
              <Button>Upload Screenshot</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Is This Legit?</CardTitle>
            <CardDescription>
              Paste a message, email, or URL. We’ll analyze it for scam signals and give you a legit score and clear next steps.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/legit-check">
              <Button variant="outline">Check message or link</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
