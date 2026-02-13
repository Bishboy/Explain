"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/risk-badge";
import type { ExplainResponse } from "@/store/api/explainApi";
import type { LegitCheckResponse } from "@/store/api/legitCheckApi";

type ResultsPanelProps =
  | { type: "explain"; data: ExplainResponse }
  | { type: "legit"; data: LegitCheckResponse }
  | { type: null; data: null };

export function ResultsPanel({ type, data }: ResultsPanelProps) {
  if (type === null || data === null) {
    return (
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Results</CardTitle>
          <CardDescription className="text-sm">
            Run an analysis to see results here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use Upload Screenshot or Is This Legit? to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (type === "explain") {
    const d = data as ExplainResponse;
    return (
      <Card className="border border-border/60 border-l-4 border-l-primary animate-fade-in shadow-soft">
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base font-semibold">Screenshot explanation</CardTitle>
            <RiskBadge level={d.riskLevel} className="shrink-0" />
          </div>
        </CardHeader>
        <CardContent className="space-y-5 text-sm">
          <section className="rounded-xl bg-muted/30 p-4">
            <h4 className="font-semibold text-foreground mb-1.5">What this means</h4>
            <p className="text-muted-foreground leading-relaxed">{d.whatThisMeans}</p>
          </section>
          <section className="rounded-xl bg-muted/30 p-4">
            <h4 className="font-semibold text-foreground mb-1.5">Why you&apos;re seeing it</h4>
            <p className="text-muted-foreground leading-relaxed">{d.whySeeingIt}</p>
          </section>
          {d.scamSignals.length > 0 && (
            <section>
              <h4 className="font-semibold text-foreground mb-1.5">Signals to watch</h4>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                {d.scamSignals.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>
          )}
          <Alert className="border-primary/20 bg-primary/5">
            <AlertTitle>What to do next</AlertTitle>
            <AlertDescription className="leading-relaxed">{d.whatToDoNext}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const d = data as LegitCheckResponse;
  const scoreVariant =
    d.legitScore >= 70 ? "safe" : d.legitScore >= 40 ? "caution" : "danger";
  return (
    <Card className="border border-border/60 border-l-4 border-l-primary animate-fade-in shadow-soft">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base font-semibold">Is this legit?</CardTitle>
          <Badge variant={scoreVariant} className="shrink-0 font-semibold">{d.legitScore}% legit</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        <section>
          <h4 className="font-semibold text-foreground mb-1.5">Reasons for this score</h4>
          <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
            {d.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>
        <section>
          <h4 className="font-semibold text-foreground mb-1.5">Next steps</h4>
          <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
            {d.nextSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
        {d.scamSignals.length > 0 && (
          <section>
            <h4 className="font-semibold text-foreground mb-1.5">Scam signals</h4>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              {d.scamSignals.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>
        )}
        <Alert variant="warning">
          <AlertTitle>If you already clicked</AlertTitle>
          <AlertDescription className="leading-relaxed">{d.ifYouAlreadyClicked}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
