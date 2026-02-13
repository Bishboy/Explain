"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

/**
 * Monetization UI placeholder. No payment integration yet.
 * Premium: $2.99 — step-by-step fixes, unlimited checks, export (PDF/shareable link).
 */
export function PremiumUpsell() {
  return (
    <Card className="border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent shadow-soft">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          <CardTitle className="text-sm font-semibold">Upgrade to Premium</CardTitle>
        </div>
        <CardDescription className="text-xs leading-relaxed">
          $2.99 — Unlimited checks, step-by-step fixes, export results. Payment integration coming soon.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Button variant="secondary" size="sm" disabled className="w-full">
          Coming soon
        </Button>
      </CardContent>
    </Card>
  );
}
