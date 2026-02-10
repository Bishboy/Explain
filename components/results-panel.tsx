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
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Results</CardTitle>
          <CardDescription className="text-xs">
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
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base">Screenshot explanation</CardTitle>
            <RiskBadge level={d.riskLevel} className="shrink-0" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <section>
            <h4 className="font-medium text-foreground mb-1">What this means</h4>
            <p className="text-muted-foreground">{d.whatThisMeans}</p>
          </section>
          <section>
            <h4 className="font-medium text-foreground mb-1">Why you’re seeing it</h4>
            <p className="text-muted-foreground">{d.whySeeingIt}</p>
          </section>
          {d.scamSignals.length > 0 && (
            <section>
              <h4 className="font-medium text-foreground mb-1">Signals to watch</h4>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                {d.scamSignals.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>
          )}
          <Alert>
            <AlertTitle>What to do next</AlertTitle>
            <AlertDescription>{d.whatToDoNext}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const d = data as LegitCheckResponse;
  const scoreVariant =
    d.legitScore >= 70 ? "safe" : d.legitScore >= 40 ? "caution" : "danger";
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">Is this legit?</CardTitle>
          <Badge variant={scoreVariant} className="shrink-0">{d.legitScore}% legit</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <section>
          <h4 className="font-medium text-foreground mb-1">Reasons for this score</h4>
          <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
            {d.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </section>
        <section>
          <h4 className="font-medium text-foreground mb-1">Next steps</h4>
          <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
            {d.nextSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
        {d.scamSignals.length > 0 && (
          <section>
            <h4 className="font-medium text-foreground mb-1">Scam signals</h4>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              {d.scamSignals.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>
        )}
        <Alert variant="warning">
          <AlertTitle>If you already clicked</AlertTitle>
          <AlertDescription>{d.ifYouAlreadyClicked}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
