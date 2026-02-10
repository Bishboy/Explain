import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LegitCheckRequest {
  /** Pasted message, email body, or URL string */
  text: string;
}

export interface LegitCheckResponse {
  legitScore: number; // 0–100
  reasons: string[];
  nextSteps: string[];
  ifYouAlreadyClicked: string;
  scamSignals: string[];
}

export const legitCheckApi = createApi({
  reducerPath: "legitCheckApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    checkLegit: builder.mutation<LegitCheckResponse, LegitCheckRequest>({
      query: (body) => ({
        url: "/legit-check",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCheckLegitMutation } = legitCheckApi;
