import { configureStore } from "@reduxjs/toolkit";
import { gamesApi } from "src/utils/gamesApi";

export const store = configureStore({
  reducer: {
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability checks
    }).concat(gamesApi.middleware),
});
