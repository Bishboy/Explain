import { NextRequest, NextResponse } from "next/server";
import type {
  LegitCheckRequest,
  LegitCheckResponse,
} from "@/store/api/legitCheckApi";

/**
 * Mock "Is this legit?" analysis. Replace with real AI or rules engine later.
 */
function getMockLegitCheck(text: string): LegitCheckResponse {
  const lower = text.toLowerCase().trim();
  const reasons: string[] = [];
  const nextSteps: string[] = [];
  const scamSignals: string[] = [];

  const hasUrgency = /urgent|asap|act now|limited time|expires today/i.test(lower);
  const hasMoney = /wire|transfer|pay|account number|password|ssn|social security/i.test(lower);
  const hasSuspiciousDomain =
    /\.tk|\.ml|\.ga|bit\.ly|tinyurl|free.*\.com|claim.*\.com/i.test(lower);
  const hasGreeting = /dear (customer|sir|madam|friend)/i.test(lower);
  const hasGrammarIssues = /congratulation[^s]|your (account|bank)/i.test(lower);

  if (hasUrgency) {
    scamSignals.push("Uses urgency or time pressure.");
    reasons.push("Urgent language is often used in scams.");
  }
  if (hasMoney) {
    scamSignals.push("Asks for money or sensitive information.");
    reasons.push("Legitimate companies rarely ask for wire transfers or passwords via message.");
  }
  if (hasSuspiciousDomain) {
    scamSignals.push("Contains suspicious or short-link domains.");
    reasons.push("Short or unusual domains are commonly used in phishing.");
  }
  if (hasGreeting) {
    reasons.push("Generic greetings like 'Dear Customer' are common in scam emails.");
  }
  if (hasGrammarIssues) {
    reasons.push("Spelling or grammar mistakes can indicate a scam.");
  }

  if (reasons.length === 0) {
    reasons.push("No strong scam indicators found in the text.");
  }

  nextSteps.push("Do not click links or download attachments until you’ve verified the sender.");
  nextSteps.push("Check the sender’s email or profile; look for official contact details elsewhere.");
  if (hasMoney || hasUrgency) {
    nextSteps.push("Contact the company or person through a known official channel (website, phone on your bill) to confirm.");
  }

  const legitScore = Math.max(0, 100 - scamSignals.length * 25 - reasons.length * 5);
  const ifYouAlreadyClicked =
    "If you already clicked a link or entered details: change any passwords you use on that site, enable two-factor authentication if possible, and check your account and bank statements. If you shared payment info, contact your bank or card issuer.";

  return {
    legitScore: Math.round(legitScore),
    reasons,
    nextSteps,
    ifYouAlreadyClicked,
    scamSignals: scamSignals.length ? scamSignals : ["None detected in this sample."],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: LegitCheckRequest = await request.json();
    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (!text) {
      return NextResponse.json(
        { error: "Missing 'text' in request body" },
        { status: 400 }
      );
    }

    const result = getMockLegitCheck(text);
    return NextResponse.json(result);
  } catch (e) {
    console.error("Legit-check API error:", e);
    return NextResponse.json(
      { error: "Failed to analyze content" },
      { status: 500 }
    );
  }
}
