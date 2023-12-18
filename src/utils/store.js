import { configureStore } from "@reduxjs/toolkit";
import { gamesApi } from "src/utils/gamesApi";
import userReducer from "src/utils/userSlice";
import buttonReducer from "src/utils/buttonSlice";
import selectedGameReducer from "src/utils/selectedGameSlice";
import wishlistReducer from "src/utils/wishlistSlice";

export const store = configureStore({
  reducer: {
    [gamesApi.reducerPath]: gamesApi.reducer,
    user: userReducer,
    button: buttonReducer,
    selectedGame: selectedGameReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability checks
    }).concat(gamesApi.middleware),
});
