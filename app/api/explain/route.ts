import { NextRequest, NextResponse } from "next/server";
import type { ExplainRequest, ExplainResponse } from "@/store/api/explainApi";

/**
 * Mock AI explanation. Replace this with a real AI API call (e.g. OpenAI)
 * when integrating. We return a structured response in plain English.
 */
function getMockExplanation(extractedText: string): ExplainResponse {
  const hasUrgency = /urgent|asap|immediately|within 24/i.test(extractedText);
  const hasMoney = /pay|transfer|wire|account number|password/i.test(extractedText);
  const hasLink = /http|\.com|click here/i.test(extractedText);

  let riskLevel: ExplainResponse["riskLevel"] = "Low";
  const scamSignals: string[] = [];
  if (hasUrgency) {
    scamSignals.push("Uses urgent or time-pressure language.");
    riskLevel = riskLevel === "Low" ? "Medium" : riskLevel;
  }
  if (hasMoney) {
    scamSignals.push("Asks for money or sensitive account details.");
    riskLevel = "High";
  }
  if (hasLink) {
    scamSignals.push("Contains links—verify the URL before clicking.");
    if (riskLevel === "Low") riskLevel = "Medium";
  }
  if (scamSignals.length === 0) {
    scamSignals.push("No obvious scam signals detected.");
  }

  return {
    whatThisMeans:
      "This looks like a message or screen that might be asking you to do something or visit a link.",
    whySeeingIt:
      "You’re seeing this because the text was detected in your screenshot. It could be from an app, email, or website.",
    riskLevel,
    scamSignals,
    whatToDoNext:
      riskLevel === "High"
        ? "Do not send money or share passwords. If you’re unsure, contact the company or person through a known, official channel (e.g. their official website or phone number from a bill)."
        : riskLevel === "Medium"
          ? "Double-check the sender and any links. If something feels off, don’t click and don’t reply."
          : "You can usually proceed with normal caution. If anything asks for money or personal details, pause and verify first.",
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ExplainRequest = await request.json();
    const extractedText =
      body.extractedText?.trim() ||
      "Sample text from your screenshot. Replace with real OCR when integrating.";

    // Mock response; swap for real AI call later
    const result = getMockExplanation(extractedText);
    return NextResponse.json(result);
  } catch (e) {
    console.error("Explain API error:", e);
    return NextResponse.json(
      { error: "Failed to explain screenshot" },
      { status: 500 }
    );
  }
}
