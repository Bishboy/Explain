import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ExplainRequest {
  /** Base64 data URL or raw text from OCR */
  imageDataUrl?: string;
  extractedText?: string;
}

export type RiskLevel = "Low" | "Medium" | "High";

export interface ExplainResponse {
  whatThisMeans: string;
  whySeeingIt: string;
  riskLevel: RiskLevel;
  scamSignals: string[];
  whatToDoNext: string;
}

export const explainApi = createApi({
  reducerPath: "explainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    explainScreenshot: builder.mutation<ExplainResponse, ExplainRequest>({
      query: (body) => ({
        url: "/explain",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useExplainScreenshotMutation } = explainApi;
