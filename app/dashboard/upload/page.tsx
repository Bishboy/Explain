"use client";

import { useState, useCallback } from "react";
import { useExplainScreenshotMutation } from "@/store/api/explainApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useScreenshotCheck } from "@/store/slices/userSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ResultsPanel } from "@/components/results-panel";
import { Upload, Loader2 } from "lucide-react";

const ACCEPT = "image/png,image/jpeg,image/jpg";
const MAX_SIZE_MB = 5;

/**
 * Mock OCR: in production replace with real OCR (e.g. Tesseract or cloud vision).
 * We use a placeholder string when no real extraction is available.
 */
function mockExtractTextFromFile(_file: File): Promise<string> {
  return new Promise((resolve) => {
    resolve(
      "Sample text extracted from screenshot. In production, plug in real OCR here (e.g. Tesseract.js or an API) and send that text to the explain endpoint."
    );
  });
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { screenshotChecksUsedToday, screenshotChecksLimit, tier } = useAppSelector(
    (s) => s.user
  );
  const [explain, { data, isLoading, isError }] = useExplainScreenshotMutation();

  const atLimit = screenshotChecksUsedToday >= screenshotChecksLimit;

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const f = e.target.files?.[0];
      if (!f) {
        setFile(null);
        return;
      }
      if (!f.type.match(/^image\/(png|jpeg|jpg)$/)) {
        setError("Please choose a PNG or JPG image.");
        setFile(null);
        return;
      }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`File must be under ${MAX_SIZE_MB} MB.`);
        setFile(null);
        return;
      }
      setFile(f);
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (!file || atLimit) return;
    setError(null);
    try {
      const extractedText = await mockExtractTextFromFile(file);
      dispatch(useScreenshotCheck());
      await explain({ extractedText }).unwrap();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }, [file, atLimit, dispatch, explain]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Screenshot</h1>
        <p className="text-muted-foreground">
          Upload a PNG or JPG and we’ll explain what it means in plain English.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Choose an image</CardTitle>
          <CardDescription>
            We’ll read the text from the image (mock OCR for now) and explain what it means, the risk level, and what to do next.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tier === "free" && (
            <p className="text-sm text-muted-foreground">
              Daily checks: {screenshotChecksUsedToday} / {screenshotChecksLimit} used.
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
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <label className="cursor-pointer w-full sm:w-auto">
              <input
                type="file"
                accept={ACCEPT}
                onChange={onFileChange}
                className="sr-only"
                disabled={atLimit}
              />
              <Button type="button" variant="outline" className="w-full sm:w-auto min-h-[44px]" asChild>
                <span>
                  <Upload className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">{file ? file.name : "Select file"}</span>
                </span>
              </Button>
            </label>
            <Button
              onClick={handleSubmit}
              disabled={!file || atLimit || isLoading}
              className="w-full sm:w-auto min-h-[44px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Explaining…
                </>
              ) : (
                "Explain this screenshot"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {data && <ResultsPanel type="explain" data={data} />}
      {isError && !data && (
        <Alert variant="destructive">
          <AlertDescription>We couldn’t explain this screenshot. Please try again.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
