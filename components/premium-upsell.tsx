"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Monetization UI placeholder. No payment integration yet.
 * Premium: $2.99 — step-by-step fixes, unlimited checks, export (PDF/shareable link).
 */
export function PremiumUpsell() {
  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-base">Upgrade to Premium</CardTitle>
        <CardDescription>
          $2.99 — Step-by-step fixes, unlimited checks, export results (PDF or shareable link). Payment integration coming soon.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="secondary" size="sm" disabled>
          Coming soon
        </Button>
      </CardContent>
    </Card>
  );
}
