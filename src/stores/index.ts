import { configureStore } from "@reduxjs/toolkit";
import claimsReducer from "./slices/claimsSlice";

export const store = configureStore({
  reducer: {
    claims: claimsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["claims/addFilesToClaim"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.files"],
        // Ignore these paths in the state
        ignoredPaths: ["claims.claims.files"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
