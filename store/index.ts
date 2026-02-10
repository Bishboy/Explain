import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { explainApi } from "./api/explainApi";
import { legitCheckApi } from "./api/legitCheckApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [explainApi.reducerPath]: explainApi.reducer,
    [legitCheckApi.reducerPath]: legitCheckApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      explainApi.middleware,
      legitCheckApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
