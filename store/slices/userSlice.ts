import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** Free tier daily limits; premium has unlimited */
const FREE_DAILY_SCREENSHOT_CHECKS = 5;
const FREE_DAILY_LEGIT_CHECKS = 5;

export type Tier = "free" | "premium";

export interface UserState {
  tier: Tier;
  /** Resets conceptually at midnight; for demo we just decrement */
  screenshotChecksUsedToday: number;
  legitChecksUsedToday: number;
  screenshotChecksLimit: number;
  legitChecksLimit: number;
}

const initialState: UserState = {
  tier: "free",
  screenshotChecksUsedToday: 0,
  legitChecksUsedToday: 0,
  screenshotChecksLimit: FREE_DAILY_SCREENSHOT_CHECKS,
  legitChecksLimit: FREE_DAILY_LEGIT_CHECKS,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTier(state, action: PayloadAction<Tier>) {
      state.tier = action.payload;
      if (action.payload === "premium") {
        state.screenshotChecksLimit = Number.MAX_SAFE_INTEGER;
        state.legitChecksLimit = Number.MAX_SAFE_INTEGER;
      } else {
        state.screenshotChecksLimit = FREE_DAILY_SCREENSHOT_CHECKS;
        state.legitChecksLimit = FREE_DAILY_LEGIT_CHECKS;
      }
    },
    useScreenshotCheck(state) {
      if (state.screenshotChecksUsedToday < state.screenshotChecksLimit) {
        state.screenshotChecksUsedToday += 1;
      }
    },
    useLegitCheck(state) {
      if (state.legitChecksUsedToday < state.legitChecksLimit) {
        state.legitChecksUsedToday += 1;
      }
    },
    /** For demo: reset daily usage */
    resetDailyUsage(state) {
      state.screenshotChecksUsedToday = 0;
      state.legitChecksUsedToday = 0;
    },
  },
});

export const { setTier, useScreenshotCheck, useLegitCheck, resetDailyUsage } =
  userSlice.actions;
export default userSlice.reducer;
