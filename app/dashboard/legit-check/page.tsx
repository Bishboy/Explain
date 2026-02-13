"use client";

import { useState, useCallback } from "react";
import { useCheckLegitMutation } from "@/store/api/legitCheckApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLegitCheck } from "@/store/slices/userSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ResultsPanel } from "@/components/results-panel";
import { Loader2 } from "lucide-react";

export default function LegitCheckPage() {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { legitChecksUsedToday, legitChecksLimit, tier } = useAppSelector(
    (s) => s.user
  );
  const [checkLegit, { data, isLoading, isError }] = useCheckLegitMutation();

  const atLimit = legitChecksUsedToday >= legitChecksLimit;

  const handleSubmit = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please paste a message, email, or URL to check.");
      return;
    }
    if (atLimit) return;
    setError(null);
    try {
      dispatch(useLegitCheck());
      await checkLegit({ text: trimmed }).unwrap();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }, [text, atLimit, dispatch, checkLegit]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Is This Legit?</h1>
        <p className="text-muted-foreground mt-2 text-[15px]">
          Paste a message, email, or link and we’ll flag scam signals and suggest next steps.
        </p>
      </div>

      <Card className="border border-border/60 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Paste text or URL</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            We’ll analyze it for urgency tricks, suspicious domains, and other scam signals and give you a legit score (0–100%) and clear next steps.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tier === "free" && (
            <p className="text-sm text-muted-foreground">
              Daily checks: {legitChecksUsedToday} / {legitChecksLimit} used.
            </p>
          )}
          {atLimit && (
            <Alert variant="destructive">
              <AlertDescription>
                You’ve reached your daily limit. Upgrade to Premium for unlimited checks.
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Textarea
            placeholder="Paste message, email body, or URL here…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="resize-y"
            disabled={atLimit}
          />
          <Button
            onClick={handleSubmit}
            disabled={!text.trim() || atLimit || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking…
              </>
            ) : (
              "Check if legit"
            )}
          </Button>
        </CardContent>
      </Card>

      {data && <ResultsPanel type="legit" data={data} />}
      {isError && !data && (
        <Alert variant="destructive">
          <AlertDescription>We couldn’t check this. Please try again.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
