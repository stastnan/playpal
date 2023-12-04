import { configureStore } from "@reduxjs/toolkit";
import { gamesApi } from "src/utils/hotGamesApi";
export const store = configureStore({
  reducer: {
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gamesApi.middleware),
});
